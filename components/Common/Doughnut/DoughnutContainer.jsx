import React, { useEffect, useState } from 'react'
import DoughnutChart from '../Doughnut';
import AuthServices from '@/utils/axios-api';
import { customError } from '../Toast';

const DoughnutContainer = ({ endpoint, appliedFilter, label, From }) => {
    const [productPeriod, setProductPeriod] = useState('day');
    const [productLabelForDoughnut, setProductLabelForDoughnut] = useState([]);
    const [productValueForDoughnut, setProductValueForDoughnut] = useState([]);
    const [productList, setProductList] = useState([]);
    const [productListDoughtnutPeriod, setProductListDoughtnutPeriod] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState(null);

    useEffect(() => {
        if (appliedFilter != null) {

            From == "SaleProduct" && topSellingProductOverallHandler(productPeriod);
            From == "SaleCategory" && topSellingCategoryOverallHandler(productPeriod);
            From === "SaleSubCategory" && topSellingSubCategoryOverallHandler(productPeriod);
        }
    }, [appliedFilter, productPeriod])

    useEffect(() => {
        if (selectedPeriod != null) {

            const getData = productList.filter((product) => product.period == selectedPeriod)

            From == "SaleProduct" && getProductLabelAndValues(getData[0].topProductsByRevenue)
            From == "SaleCategory" && getCategoryLabelAndValues(getData[0].topCategoriesByRevenue)
            From === "SaleSubCategory" && getSubCategoryLabelAndValues(getData[0].topSubCategoriesByRevenue)

        }
    }, [selectedPeriod])

    const topSellingProductOverallHandler = async (period) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(endpoint, { ...appliedFilter, "period": period, "limit": 10 });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("topSellingProductOverallHandler", response?.data);
            setProductList(response.data)
            let periods = response.data.map((data) => { return data.period });
            console.log("periods", periods)
            setProductListDoughtnutPeriod(periods)

            getProductLabelAndValues(response.data[0].topProductsByRevenue)

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const getProductLabelAndValues = (values) => {
        let getlabels = values.map(data => { return data.productName })
        let getValue = values.map(data => { return data.totalRevenue })
        setProductLabelForDoughnut(getlabels);
        setProductValueForDoughnut(getValue)
    }

    const topSellingCategoryOverallHandler = async (period) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(endpoint, { ...appliedFilter, "period": period, "limit": 10, "sortBy": "totalRevenue" });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("topSellingCategoryOverallHandler", response?.data);
            setProductList(response.data)
            let periods = response.data.map((data) => { return data.period });
            console.log("periods", periods)
            setProductListDoughtnutPeriod(periods)
            getCategoryLabelAndValues(response.data[0].topCategoriesByRevenue)

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const getCategoryLabelAndValues = (values) => {
        let getlabels = values.map(data => { return data.category })
        let getValue = values.map(data => { return data.totalRevenue })
        setProductLabelForDoughnut(getlabels);
        setProductValueForDoughnut(getValue)
    }

    const topSellingSubCategoryOverallHandler = async (period) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(endpoint, { ...appliedFilter, "period": period, "limit": 10, "sortBy": "totalRevenue" });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("topSellingSubCategoryOverallHandler", response?.data);
            setProductList(response.data)
            let periods = response.data.map((data) => { return data.period });
            console.log("periods", periods)
            setProductListDoughtnutPeriod(periods)
            getCategoryLabelAndValues(response.data[0].topSubCategoriesByRevenue)

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const getSubCategoryLabelAndValues = (values) => {
        let getlabels = values.map(data => { return data.subcategory })
        let getValue = values.map(data => { return data.totalRevenue })
        setProductLabelForDoughnut(getlabels);
        setProductValueForDoughnut(getValue)
    }


    return (
        <DoughnutChart labels={productLabelForDoughnut} values={productValueForDoughnut} labelName={label} period={setProductPeriod} productListDoughtnutPeriod={productListDoughtnutPeriod} setSelectedPeriod={setSelectedPeriod} />
    )
}

export default DoughnutContainer