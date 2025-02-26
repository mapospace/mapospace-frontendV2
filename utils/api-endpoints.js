import ApiKeyGenerator from "@/app/profile/api-key/page";

export const API_ENDPOINTS = {
    GetTenant: 'tenant/view-tenant',
    PutTenant: 'tenant/update-tenant',
    ApiKeyGenerator: 'api-key/api-key-generation',
    PasswordReset: 'user/reset-password',
    UserList: 'user-mgmt/users',
    AddUser: 'user-mgmt/add-user',
    UserActiveToggle: 'user-mgmt/toggle-active-status',
    UserListWithoutRoot: 'user-mgmt/non-root-users',

    GroupCreate: 'user-group/create',
    GroupList: 'user-group/list',
    GroupActiveToggle: (group_id) => {
        return `user-group/toggle-active/${group_id}`
    },
    GroupDelete: (group_id) => {
        return `user-group/${group_id}`
    },



    GeoJson: (loc) => {
        return `GEO-JSON/geo-json?page=1&search=${loc}`
    },

    PolygonSave: 'geo-json/geo-json',

    RefreshToken: 'user/refresh-token-login',

    Catalogs: 'catalogs/all-catalogs',
    TotalSales: 'analytics/total-sales',
    TotalSalesOverTime: 'analytics/total-sales-over-time',

    OrderSales: 'analytics/average-order',
    OrderSalesOverTime: 'analytics/average-order-over-time',
    TopSellingSankey: 'analytics/total-sales-and-sankey-data-switch',

    TopSellingProduct: 'analytics/top-selling-products',
    TopSellingProductsOverTime: "analytics/top-selling-products-over-time",
    TopSellingProductSankey: 'analytics/total-sales-and-sankey-data',
    OrderValueDistribution: 'analytics/order-value-distribution',

    H3Clusting: "analytics/perform-clustering-h3",
    SalesDensity: 'analytics/sales-density',
    PerformClustering: 'analytics/perform-clustering',

    SalesByCategory: 'analytics/sales-by-category',
    TopSellingCategoryOverTime: 'analytics/sales-by-category-over-time',

    SalesBySubCategory: 'analytics/sales-by-subcategory',
    TopSellingSubCategoryOverTime: 'analytics/sales-by-subcategory-over-time',

}