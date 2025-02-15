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

    PolygonSave: 'geo-json/geo-json',

    RefreshToken: 'user/refresh-token-login'

}