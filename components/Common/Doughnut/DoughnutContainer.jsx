import React, { useEffect, useState } from 'react'
import DoughnutChart from '../Doughnut';
import AuthServices from '@/utils/axios-api';
import { customError } from '../Toast';

const DoughnutContainer = ({ endpoint, appliedFilter, label, From, description }) => {
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
            From === "ViewCategory" && ViewCategoryOverallHandler(productPeriod)
            From === "ViewSubCategory" && ViewSubCategoryOverallHandler(productPeriod)
        }
    }, [appliedFilter, productPeriod])

    useEffect(() => {
        if (selectedPeriod != null && productList.length > 0) {
            const getData = productList.filter((product) => product?.period === selectedPeriod) || [];
            if (getData.length > 0) {
                From === "SaleProduct" && getProductLabelAndValues(getData[0]?.topProductsByRevenue || []);
                From === "SaleCategory" && getCategoryLabelAndValues(getData[0]?.topCategoriesByRevenue || []);
                From === "SaleSubCategory" && getSubCategoryLabelAndValues(getData[0]?.topSubCategoriesByRevenue || []);
                From === "ViewCategory" && getViewCategoryLabelAndValues(getData[0]?.topCategoriesByViews || []);
                From === "ViewSubCategory" && getViewSubCategoryLabelAndValues(getData[0]?.topSubcategoriesByViews || []);
            }
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
            const data = response?.data || [];
            setProductList(data);
            const periods = data.map((item) => item?.period || 'N/A');
            console.log("periods", periods);
            setProductListDoughtnutPeriod(periods);
            getProductLabelAndValues(data[0]?.topProductsByRevenue || []);

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const getProductLabelAndValues = (values = []) => {
        const getlabels = values.map(data => data?.productName || 'N/A');
        const getValue = values.map(data => data?.totalRevenue || 0);
        setProductLabelForDoughnut(getlabels);
        setProductValueForDoughnut(getValue);
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
            const data = response?.data || [];
            setProductList(data);
            const periods = data.map((item) => item?.period || 'N/A');
            console.log("periods", periods);
            setProductListDoughtnutPeriod(periods);
            getCategoryLabelAndValues(data[0]?.topCategoriesByRevenue || []);

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const ViewCategoryOverallHandler = async (period) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(endpoint, { ...appliedFilter, "period": period });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("ViewCategoryOverallHandler", response?.data);
            const data = response?.data || [];
            setProductList(data);
            const periods = data.map((item) => item?.period || 'N/A');
            console.log("periods", periods);
            setProductListDoughtnutPeriod(periods);
            getViewCategoryLabelAndValues(data[0]?.topCategoriesByViews || []);

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const ViewSubCategoryOverallHandler = async (period) => {
        try {
            const authService = new AuthServices();
            const response = await authService.postApiCallHandler(endpoint, { ...appliedFilter, "period": period });

            if (response?.error) {
                console.log(response)
                customError(response.message || "Failed to fetch data.");
                return;
            }
            console.log("ViewCategoryOverallHandler", response?.data);
            const data = response?.data || [];
            setProductList(data);
            const periods = data.map((item) => item?.period || 'N/A');
            console.log("periods", periods);
            setProductListDoughtnutPeriod(periods);
            getViewSubCategoryLabelAndValues(data[0]?.topSubcategoriesByViews || []);

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const getCategoryLabelAndValues = (values = []) => {
        const getlabels = values.map(data => data?.category || 'N/A');
        const getValue = values.map(data => data?.totalRevenue || 0);
        setProductLabelForDoughnut(getlabels);
        setProductValueForDoughnut(getValue);
    }

    const getViewCategoryLabelAndValues = (values = []) => {
        const getlabels = values.map(data => data?.category || 'N/A');
        const getValue = values.map(data => data?.totalViews || 0);
        setProductLabelForDoughnut(getlabels);
        setProductValueForDoughnut(getValue);
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
            const data = response?.data || [];
            setProductList(data);
            const periods = data.map((item) => item?.period || 'N/A');
            console.log("periods", periods);
            setProductListDoughtnutPeriod(periods);
            getSubCategoryLabelAndValues(data[0]?.topSubCategoriesByRevenue || []);

        } catch (err) {
            console.error("Error fetching user details:", err);

        }
    }

    const getSubCategoryLabelAndValues = (values = []) => {
        const getlabels = values.map(data => data?.subcategory || 'N/A');
        const getValue = values.map(data => data?.totalRevenue || 0);
        setProductLabelForDoughnut(getlabels);
        setProductValueForDoughnut(getValue);
    }

    const getViewSubCategoryLabelAndValues = (values = []) => {
        const getlabels = values.map(data => data?.subcategory || 'N/A');
        const getValue = values.map(data => data?.totalViews || 0);
        setProductLabelForDoughnut(getlabels);
        setProductValueForDoughnut(getValue);
    }

    return (
        <DoughnutChart labels={productLabelForDoughnut} values={productValueForDoughnut} labelName={label} period={setProductPeriod} productListDoughtnutPeriod={productListDoughtnutPeriod} setSelectedPeriod={setSelectedPeriod} description={description} />
    )
}

export default DoughnutContainer