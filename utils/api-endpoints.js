import ApiKeyGenerator from "@/app/profile/api-key/page";

export const API_ENDPOINTS = {
    GetTenant: 'tenant/view-tenant',
    PutTenant: 'tenant/update-tenant',
    ApiKeyGenerator: 'api-key/api-key-generation',

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

    TopSellingProduct: 'analytics/top-selling-products',
    TopSellingProductsOverTime: "analytics/top-selling-products-over-time",
    TopSellingProductSankey: 'analytics/total-sales-and-sankey-data',
    OrderValueDistribution: 'analytics/order-value-distribution'

}