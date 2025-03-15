"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { MdDelete } from "react-icons/md";


const dateValue = [
    { value: "eq", label: "Exact Date" },
    { value: "gte", label: "After (≥)" },
    { value: "lte", label: "Before (≤)" },
    { value: "between", label: "Between" }
];

const stringValue = [
    { value: "eq", label: "Equals" },
    { value: "regex", label: "Contains" },
    { value: "in", label: "In List" },
    { value: "nin", label: "Not In List" }
]

const numberValue = [
    { value: "eq", label: "Equals" },
    { value: "gt", label: "Greater Than" },
    { value: "gte", label: "Greater or Equal" },
    { value: "lt", label: "Less Than" },
    { value: "lte", label: "Less or Equal" },
]

const booleanValue = [
    { value: 'true', label: "True" },
    { value: 'false', label: "False" },
]
const style = {
    control: (provided) => ({
        ...provided,
        minHeight: 'unset',
        height: 'auto',
        padding: "2px",
        margin: 0,
        border: '1px solid #bfbfbf',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        color: '#bfbfbf',
        borderRadius: '8px'
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999, // Ensures dropdown appears above everything
        backgroundColor: '#ffffff', // Matches parent container background
        borderRadius: '8px',
        border: '1px solid #bfbfbf',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '4px',
        color: '#000',
        fontSize: '12px'
    }),
    menuPortal: (base) => ({
        ...base,
        zIndex: 9999, // Ensures dropdown appears on top
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '2px',
        margin: 0,
        color: '#bfbfbf', // Matches text color
        borderRadius: '8px'
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        padding: '5px',
        color: '#bfbfbf',
        borderRadius: '8px',

    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: '0px',
        margin: 0,
        color: '#bfbfbf',
        borderRadius: '8px',
        fontSize: '12px',

    }),
    singleValue: (provided) => ({
        ...provided,
        paddingLeft: '4px',
        margin: 0,
        borderRadius: '8px',

    }),
}

const MongoQueryBuilder = ({ propertyNameList, propertyList, setQuery, name, getData, data }) => {
    const [conditions, setConditions] = useState([{ id: Date.now(), field: "", dataType: "string", operator: "eq", value: "" }]);
    const [operators, setOperators] = useState(stringValue);

    useEffect(() => {
        console.log("MongoQueryBuilder setQuery conditions", conditions)
        if (name) {
            setQuery((prev => { return { ...prev, [name]: JSON.parse(generateQuery()) } }));
            getData(prev => ({
                ...prev,
                filter_status: {
                    ...prev.filter_status, // Preserve existing properties
                    [name]: conditions // Update specific key
                }
            }));
        }
    }, [conditions, setQuery]);



    useEffect(() => {
        if (data && data.filter_status && data.filter_status[name]) {
            console.log("MongoQueryBuilder revert", data.filter_status[name])
            setConditions(data.filter_status[name]);
        } else {
            setConditions([{ id: Date.now(), field: "", dataType: "string", operator: "eq", value: "" }])
        }
    }, [name])

    const addProperty = () => {
        setConditions([
            { id: Date.now(), field: "", dataType: "string", operator: "eq", value: "" }, ...conditions
        ]);
    };

    const removeProperty = (id) => {
        setConditions(conditions.filter((cond) => cond.id !== id));
    };

    const updateCondition = (id, key, value) => {
        console.log("updateCondition", id, key, value)
        setConditions(
            conditions.map((cond) => (cond.id === id ? { ...cond, [key]: value } : cond))
        );
    };

    const generateQuery = () => {
        // console.log("generateQuery === generateQuery === generateQuery")
        let query = {};

        conditions.forEach(({ field, dataType, operator, value, valueMax }) => {
            if (!field || (!value && dataType != "boolean")) return;

            if (dataType === "string") {
                if (operator === "eq") query[`payload.${field}`] = value;
                else if (operator === "regex") query[`payload.${field}`] = { $regex: value, $options: "i" };
                else if (operator === "in") query[`payload.${field}`] = { $in: value.split(",").map((v) => v.trim()) };
                else if (operator === "nin") query[`payload.${field}`] = { $nin: value.split(",").map((v) => v.trim()) };
            } else if (dataType === "number") {
                query[`payload.${field}`] = { [`$${operator}`]: Number(value) };
            } else if (dataType === "date") {
                query[`payload.${field}`] =
                    operator === "between" && valueMax
                        ? { $gte: new Date(value), $lte: new Date(valueMax) }
                        : { [`$${operator}`]: new Date(value) };
            } else if (dataType === "boolean") {
                query[`payload.${field}`] = operator === "true";
            }
        });
        // getData((prev) => ({ ...prev, 'filter': query }))
        return JSON.stringify(query, null, 2);
    };


    const parseDefaultQuery = (query) => {
        let conditions = [];
        for (const field in query) {
            const fieldParts = field.split(".");
            const fieldName = fieldParts[fieldParts.length - 1];
            const operators = Object.keys(query[field]);

            operators.forEach((op) => {
                const value = query[field][op];

                let dataType = "string";
                if (typeof value === "number") {
                    dataType = "number";
                } else if (typeof value === "boolean") {
                    dataType = "boolean";
                } else if (value instanceof Date || (typeof value === "string" && !isNaN(Date.parse(value)))) {
                    dataType = "date";
                }

                const operatorKey = op.replace("$", "");
                conditions.push({
                    id: Date.now() + Math.random(),
                    field: fieldName,
                    dataType,
                    operator: operatorKey,
                    value
                });
            });
        }
        return conditions.length ? conditions : [{ id: Date.now(), field: "", dataType: "string", operator: "eq", value: "" }];
    };


    return (
        <div className="max-w-2xl mx-auto p-6  bg-white  rounded-lg  h-[calc(100%-50px)] overflow-y-scroll hide-scrollbar">
            <div className="flex justify-between items-center mb-s">
                <div className="text-neutral-1200 text-f-xl">
                    {name} Properties
                </div>
                {conditions.length < propertyNameList.length && <button
                    onClick={addProperty}
                    className=" mb-s default-button text-f-s py-s "
                >
                    + Add Property
                </button>}
            </div>

            {conditions.map(({ id, field, dataType, operator, value, valueMax }) => (
                <div key={id} className="p-4 border rounded-bs bg-white mb-4 relative">
                    {/* <button
                        onClick={() => removeProperty(id)}
                        className="absolute right-2 top-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md hover:bg-red-600"
                    >
                        Remove
                    </button> */}
                    <div className="flex items-center justify-between text-neutral-1200">
                        <div> Property</div>
                        <MdDelete onClick={() => removeProperty(id)} />
                    </div>
                    <div className="mt-s">
                        <label className="block text-neutral-1200 font-semibold text-f-s font-medium mb-xs">Property Name:</label>

                        {propertyNameList && <Select
                            options={propertyNameList.filter(option =>
                                !conditions.some(cond => cond.field === option.value)
                            )}
                            value={propertyNameList.find(option => option.value === field)}
                            onChange={(selected) => {

                                const propertyName = propertyList.filter((property) => property.key == selected.value);

                                const selectedType = propertyName[0].dataType == "string" ? stringValue : propertyName[0].dataType == "number" ? numberValue : propertyName[0].dataType == "date" ? dateValue : booleanValue
                                setOperators(selectedType)
                                setConditions(prevConditions =>
                                    prevConditions.map(cond =>
                                        cond.id === id
                                            ? {
                                                ...cond,
                                                field: selected.value,
                                                dataType: propertyName[0].dataType,
                                                operator: selectedType[0]?.value || "eq"
                                            }
                                            : cond
                                    )
                                );
                                console.log("selected property type", selected.value, selectedType[0].value, propertyName[0].dataType)
                            }}
                            menuPortalTarget={document.body} // Moves dropdown outside of parent to prevent clipping
                            menuPosition="fixed" // Ensures the dropdown stays visible
                            isSearchable={false}
                            className="!m-0 !p-0 !h-auto !w-auto !border-none !shadow-none text-black !text-f-s z-30"
                            styles={style}
                        />}
                    </div>

                    <div className="mt-s flex gap-l">
                        <div className="flex-1">
                            <label className="block text-neutral-1200 font-semibold text-f-s font-medium mb-xs">Data Type:</label>
                            <div className="text-neutral-1200 border rounded-bs text-f-s px-s border-neutral-600 py-s">{dataType || "undefined"}</div>

                        </div>
                        <div className="flex-1">
                            <label className="block text-neutral-1200 font-semibold text-f-s font-medium mb-xs">Operator:</label>
                            <Select
                                options={operators}
                                value={operators.find(option => option.value === operator)}
                                onChange={(selected) => {
                                    updateCondition(id, "operator", selected.value)
                                }}
                                menuPortalTarget={document.body} // Moves dropdown outside of parent to prevent clipping
                                menuPosition="fixed" // Ensures the dropdown stays visible
                                isSearchable={false}
                                className="!m-0 !p-0 !h-auto !w-auto !border-none !shadow-none text-black !text-f-s z-30"
                                styles={style}
                            />
                        </div>
                    </div>
                    {dataType != "boolean" && <div className="mt-s ">
                        <label className="block text-neutral-1200 font-semibold text-f-s font-medium mb-xs">Value:</label>
                        <input
                            type={dataType === "date" ? "date" : dataType === "number" ? "number" : "text"}
                            value={value}
                            onChange={(e) => updateCondition(id, "value", e.target.value)}
                            className="w-full border border-neutral-600 border-effect px-s py-s text-f-s rounded-md  text-black"
                        />
                    </div>}


                </div>
            ))}




            <div className="flex flex-col gap-s mt-xl">
                <h3 className=" font-semibold text-neutral-1200 text-f-l ">Generated Query:</h3>
                <pre className="bg-neutral-100 p-4 rounded-md text-sm  text-neutral-1200 overflow-auto">{generateQuery()}</pre>
            </div>


        </div>
    );
};

export default MongoQueryBuilder;
