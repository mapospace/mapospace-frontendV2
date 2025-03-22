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




    TotalViews: "analytics-v2/total-views",
    TotalViewsOverTime: "analytics-v2/total-views-over-time",
    ViewsSankey: 'analytics-v2/views-sankey',
    ViewsSankeySwitch: "analytics-v2/views-sankey-switch",
    TopViewsRangeDistribution: "analytics-v2/top-views-range-distribution",
    ViewCategoryOverTime: 'analytics-v2/views-by-category-over-time',
    ViewCategory: 'analytics-v2/views-by-category',
    ViewSubCategory: 'analytics-v2/views-by-subcategory',
    ViewSubCategoryOverTime: 'analytics-v2/views-by-subcategory-over-time',

    CSAT: {
        ScoreOverTime: 'analytics-v1/csat-score-over-time',//done
        SupportTicketDistributionByLocation: 'analytics-v1/support-ticket-distribution-by-location',//done
        SupportTicketDistributionByLocationH3: 'analytics-v1/support-ticket-distribution-by-location-h3',
        ScoreAnalysis: 'analytics-v1/csat-score-analysis',//done
        SupportTicketVolumeOverTime: 'analytics-v1/support-ticket-volume-over-time',//done
        PeakHoursAnalysis: 'analytics-v1/peak-hours-analysis',//done
        RaisedByUsers: 'analytics-v1/csat-raised-by-users',//done
        ResolutionTimeAnalysis: 'analytics-v1/resolution-time-analysis',//done
        ResolutionTimeOverTime: 'analytics-v1/resolution-time-over-time',//done
        ScoreDistributionByDayOfWeek: 'analytics-v1/csat-score-distribution-by-day-of-week' //done
    },

    CustomEvent: {
        CreateCustomEvents: 'custom-events/create',
        CustomEvents: 'custom-events'
    },

    QueryBuilder: {
        CustomEvents: 'analytics-v3/custom-events',
        CustomFunnelEvents: 'analytics-v3/funnel-analysis',
        CustomSegmentationEvents: 'analytics-v3/user-segmentation',
        CustomRetentionEvents: 'analytics-v3/retention-analysis'
    }

}