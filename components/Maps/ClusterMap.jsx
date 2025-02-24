"use client";
import React, { useEffect, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const mapCenter = {
    lat: 28.6139, // New Delhi (default center)
    lng: 77.2090,
};

// const orders = [
//     {
//         "orderId": "ORDER4602",
//         "orderValue": 20899.6,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.350847,
//                 28.415446
//             ]
//         },
//         "cluster": 0
//     },
//     {
//         "orderId": "ORDER52450",
//         "orderValue": 18343.35,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.126021,
//                 28.804617
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER95148",
//         "orderValue": 4780.83,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.129119,
//                 28.748251
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER47989",
//         "orderValue": 1963.4,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.21507,
//                 28.506261
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER81907",
//         "orderValue": 5569.799999999999,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.259747,
//                 28.796699
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER47646",
//         "orderValue": 7172.58,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.16974,
//                 28.865494
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER22935",
//         "orderValue": 18433.76,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.265574,
//                 28.45184
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER85701",
//         "orderValue": 22952.1,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.351013,
//                 28.771429
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER26920",
//         "orderValue": 3123,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.180703,
//                 28.797374
//             ]
//         },
//         "cluster": 1
//     },
//     {
//         "orderId": "ORDER5146",
//         "orderValue": 16306.140000000001,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.3603,
//                 28.413773
//             ]
//         },
//         "cluster": 0
//     },
//     {
//         "orderId": "ORDER65112",
//         "orderValue": 16799.67,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.074936,
//                 28.611252
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER35477",
//         "orderValue": 5114.049999999999,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.16379,
//                 28.434071
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER60078",
//         "orderValue": 14778.25,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.074367,
//                 28.725663
//             ]
//         },
//         "cluster": 2
//     },
//     {
//         "orderId": "ORDER108",
//         "orderValue": 9114.66,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.352294,
//                 28.619678
//             ]
//         },
//         "cluster": 3
//     },
//     {
//         "orderId": "ORDER46037",
//         "orderValue": 19324.53,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.297712,
//                 28.48449
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER46129",
//         "orderValue": 26023.600000000002,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.22173,
//                 28.476341
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER72789",
//         "orderValue": 13023.010000000002,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.194165,
//                 28.517459
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER18328",
//         "orderValue": 32201.58,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.194951,
//                 28.720697
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER57263",
//         "orderValue": 16610.219999999998,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.101131,
//                 28.620885
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER46254",
//         "orderValue": 21821.76,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.163566,
//                 28.850463
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER83724",
//         "orderValue": 13129.6,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.16236,
//                 28.731411
//             ]
//         },
//         "cluster": 4
//     },
//     {
//         "orderId": "ORDER49215",
//         "orderValue": 25729.57,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.189923,
//                 28.670777
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER31608",
//         "orderValue": 27303.17,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.309759,
//                 28.653607
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER57097",
//         "orderValue": 4443.46,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.345863,
//                 28.600484
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER30890",
//         "orderValue": 12406.759999999998,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.117643,
//                 28.460414
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER42542",
//         "orderValue": 8930.25,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.31499,
//                 28.476422
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER31600",
//         "orderValue": 19106.81,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.243381,
//                 28.552769
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER79179",
//         "orderValue": 5464.17,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.276592,
//                 28.743649
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER38964",
//         "orderValue": 15006.630000000001,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.243778,
//                 28.786486
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER27146",
//         "orderValue": 18389.55,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.295172,
//                 28.777061
//             ]
//         },
//         "cluster": 5
//     },
//     {
//         "orderId": "ORDER7293",
//         "orderValue": 31764.769999999997,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.262703,
//                 28.628056
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER59744",
//         "orderValue": 16593.5,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.151552,
//                 28.857172
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER43049",
//         "orderValue": 23088.699999999997,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.324132,
//                 28.788828
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER28853",
//         "orderValue": 10316.32,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.26995,
//                 28.597282
//             ]
//         },
//         "cluster": 6
//     },
//     {
//         "orderId": "ORDER91517",
//         "orderValue": 11806.359999999999,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.229538,
//                 28.721622
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER65814",
//         "orderValue": 28417,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.204853,
//                 28.799131
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER89867",
//         "orderValue": 30054.75,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.342044,
//                 28.446694
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER31037",
//         "orderValue": 6758.05,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.23644,
//                 28.656238
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER10157",
//         "orderValue": 11178.5,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.255103,
//                 28.667073
//             ]
//         },
//         "cluster": 7
//     },
//     {
//         "orderId": "ORDER79365",
//         "orderValue": 19546.7,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.264892,
//                 28.705216
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER14593",
//         "orderValue": 7241.3099999999995,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.352641,
//                 28.720604
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER87453",
//         "orderValue": 36667.200000000004,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.159187,
//                 28.661127
//             ]
//         },
//         "cluster": 8
//     },
//     {
//         "orderId": "ORDER30887",
//         "orderValue": 24846.64,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.234519,
//                 28.873904
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER89013",
//         "orderValue": 7427.01,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.233405,
//                 28.786414
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER41266",
//         "orderValue": 1563.3899999999999,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.301263,
//                 28.857946
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER87747",
//         "orderValue": 9655.75,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.179501,
//                 28.440442
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER34211",
//         "orderValue": 23188.04,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.162613,
//                 28.686165
//             ]
//         },
//         "cluster": 8
//     },
//     {
//         "orderId": "ORDER97657",
//         "orderValue": 13337.25,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.268008,
//                 28.575617
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER36004",
//         "orderValue": 54372.92,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.349756,
//                 28.746694
//             ]
//         },
//         "cluster": 9
//     },
//     {
//         "orderId": "ORDER50302",
//         "orderValue": 1276.18,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.148579,
//                 28.635644
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER28897",
//         "orderValue": 8952.54,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.076136,
//                 28.716377
//             ]
//         },
//         "cluster": 2
//     },
//     {
//         "orderId": "ORDER28694",
//         "orderValue": 27671.010000000002,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.178812,
//                 28.798862
//             ]
//         },
//         "cluster": 1
//     },
//     {
//         "orderId": "ORDER44386",
//         "orderValue": 39745.630000000005,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.149609,
//                 28.449383
//             ]
//         },
//         "cluster": 10
//     },
//     {
//         "orderId": "ORDER61144",
//         "orderValue": 13669.06,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.103063,
//                 28.571953
//             ]
//         },
//         "cluster": 11
//     },
//     {
//         "orderId": "ORDER95373",
//         "orderValue": 26665.4,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.150761,
//                 28.442289
//             ]
//         },
//         "cluster": 10
//     },
//     {
//         "orderId": "ORDER88826",
//         "orderValue": 12942.51,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.207981,
//                 28.425204
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER47917",
//         "orderValue": 20174.53,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.219483,
//                 28.680111
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER35853",
//         "orderValue": 6418.64,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.265525,
//                 28.867602
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER11939",
//         "orderValue": 32660.45,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.261029,
//                 28.516582
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER33460",
//         "orderValue": 7178.56,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.325374,
//                 28.514853
//             ]
//         },
//         "cluster": 12
//     },
//     {
//         "orderId": "ORDER92383",
//         "orderValue": 27349.5,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.153604,
//                 28.684708
//             ]
//         },
//         "cluster": 8
//     },
//     {
//         "orderId": "ORDER88608",
//         "orderValue": 9879.04,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.315973,
//                 28.529165
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER37628",
//         "orderValue": 30988.450000000004,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.074199,
//                 28.493638
//             ]
//         },
//         "cluster": 13
//     },
//     {
//         "orderId": "ORDER78561",
//         "orderValue": 4480.31,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.350435,
//                 28.616283
//             ]
//         },
//         "cluster": 3
//     },
//     {
//         "orderId": "ORDER28992",
//         "orderValue": 38120.17,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.263689,
//                 28.600305
//             ]
//         },
//         "cluster": 6
//     },
//     {
//         "orderId": "ORDER4981",
//         "orderValue": 17925.2,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.352052,
//                 28.638236
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER62457",
//         "orderValue": 25098.4,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.315463,
//                 28.724515
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER4619",
//         "orderValue": 28339.69,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.102337,
//                 28.561432
//             ]
//         },
//         "cluster": 11
//     },
//     {
//         "orderId": "ORDER38573",
//         "orderValue": 36063.350000000006,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.168467,
//                 28.508756
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER42018",
//         "orderValue": 4852.06,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.128393,
//                 28.594508
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER19023",
//         "orderValue": 35697.15,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.332221,
//                 28.708118
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER94888",
//         "orderValue": 13194.72,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.178869,
//                 28.84708
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER20196",
//         "orderValue": 24098.699999999997,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.22974,
//                 28.632018
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER14702",
//         "orderValue": 16540.780000000002,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.159584,
//                 28.734862
//             ]
//         },
//         "cluster": 4
//     },
//     {
//         "orderId": "ORDER29242",
//         "orderValue": 28835.84,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.162813,
//                 28.446227
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER17826",
//         "orderValue": 26370.8,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.179451,
//                 28.592405
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER62322",
//         "orderValue": 40895.66,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.174791,
//                 28.804917
//             ]
//         },
//         "cluster": 1
//     },
//     {
//         "orderId": "ORDER42095",
//         "orderValue": 10984.2,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.25237,
//                 28.838097
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER48878",
//         "orderValue": 31788.32,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.092676,
//                 28.72265
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER20011",
//         "orderValue": 10696.77,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.303894,
//                 28.4428
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER84991",
//         "orderValue": 22571.199999999997,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.076074,
//                 28.502041
//             ]
//         },
//         "cluster": 13
//     },
//     {
//         "orderId": "ORDER30727",
//         "orderValue": 23661.309999999998,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.148727,
//                 28.67832
//             ]
//         },
//         "cluster": 8
//     },
//     {
//         "orderId": "ORDER82181",
//         "orderValue": 27118.879999999997,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.10114,
//                 28.585478
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER17338",
//         "orderValue": 26829.17,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.263616,
//                 28.739554
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER59224",
//         "orderValue": 2623.56,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.154919,
//                 28.738837
//             ]
//         },
//         "cluster": 4
//     },
//     {
//         "orderId": "ORDER73874",
//         "orderValue": 13112.810000000001,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.084854,
//                 28.85283
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER76524",
//         "orderValue": 26861.199999999997,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.359004,
//                 28.559481
//             ]
//         },
//         "cluster": 14
//     },
//     {
//         "orderId": "ORDER28590",
//         "orderValue": 26181.04,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.106079,
//                 28.563491
//             ]
//         },
//         "cluster": 11
//     },
//     {
//         "orderId": "ORDER80989",
//         "orderValue": 12533.900000000001,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.241671,
//                 28.771384
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER86273",
//         "orderValue": 13748.369999999999,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.241465,
//                 28.863924
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER56181",
//         "orderValue": 14892.99,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.069435,
//                 28.593313
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER21890",
//         "orderValue": 8814.51,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.191284,
//                 28.861965
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER64100",
//         "orderValue": 4254.32,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.282309,
//                 28.540016
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER80871",
//         "orderValue": 17465.260000000002,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.354153,
//                 28.749285
//             ]
//         },
//         "cluster": 9
//     },
//     {
//         "orderId": "ORDER84767",
//         "orderValue": 2721.06,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.295637,
//                 28.797998
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER36714",
//         "orderValue": 17180.13,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.108219,
//                 28.522995
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER70983",
//         "orderValue": 43648.869999999995,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.165065,
//                 28.650593
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER73258",
//         "orderValue": 17052.63,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.182414,
//                 28.705469
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER32837",
//         "orderValue": 15199.96,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.106667,
//                 28.695527
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER58148",
//         "orderValue": 21536.08,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.075479,
//                 28.695179
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER435",
//         "orderValue": 10784.390000000001,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.09185,
//                 28.464502
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER29642",
//         "orderValue": 22444.699999999997,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.15172,
//                 28.667359
//             ]
//         },
//         "cluster": 8
//     },
//     {
//         "orderId": "ORDER24299",
//         "orderValue": 16605.579999999998,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.175575,
//                 28.761775
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER46470",
//         "orderValue": 18301.16,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.348041,
//                 28.546096
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER91217",
//         "orderValue": 1008.16,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.287518,
//                 28.776105
//             ]
//         },
//         "cluster": 5
//     },
//     {
//         "orderId": "ORDER37173",
//         "orderValue": 19681.15,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.099838,
//                 28.70571
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER6984",
//         "orderValue": 14038.75,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.092814,
//                 28.499139
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER38915",
//         "orderValue": 19143.760000000002,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.189008,
//                 28.654423
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER98303",
//         "orderValue": 13296.8,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.326752,
//                 28.522744
//             ]
//         },
//         "cluster": 12
//     },
//     {
//         "orderId": "ORDER44540",
//         "orderValue": 8473.56,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.197578,
//                 28.420124
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER90610",
//         "orderValue": 32441.32,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.359739,
//                 28.746581
//             ]
//         },
//         "cluster": 9
//     },
//     {
//         "orderId": "ORDER2066",
//         "orderValue": 6837.900000000001,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.266197,
//                 28.477672
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER28581",
//         "orderValue": 27028.530000000002,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.302089,
//                 28.638367
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER51195",
//         "orderValue": 23306.73,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.25668,
//                 28.662068
//             ]
//         },
//         "cluster": 7
//     },
//     {
//         "orderId": "ORDER8590",
//         "orderValue": 9079.72,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.331837,
//                 28.46826
//             ]
//         },
//         "cluster": 15
//     },
//     {
//         "orderId": "ORDER63245",
//         "orderValue": 19388.95,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.108811,
//                 28.666662
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER16532",
//         "orderValue": 22495.78,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.150665,
//                 28.669318
//             ]
//         },
//         "cluster": 8
//     },
//     {
//         "orderId": "ORDER86480",
//         "orderValue": 30488.72,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.082212,
//                 28.731962
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER86918",
//         "orderValue": 8723.3,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.311298,
//                 28.436051
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER41075",
//         "orderValue": 16783.12,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.276012,
//                 28.586597
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER67612",
//         "orderValue": 15705.26,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.272561,
//                 28.825633
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER84688",
//         "orderValue": 45168.53999999999,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.231191,
//                 28.809688
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER69259",
//         "orderValue": 34418.18,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.338386,
//                 28.460975
//             ]
//         },
//         "cluster": 15
//     },
//     {
//         "orderId": "ORDER82812",
//         "orderValue": 7971.84,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.11156,
//                 28.587582
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER22097",
//         "orderValue": 9350.91,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.234804,
//                 28.561758
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER3298",
//         "orderValue": 31260.39,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.322801,
//                 28.573349
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER9772",
//         "orderValue": 12673.78,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.327978,
//                 28.726974
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER98746",
//         "orderValue": 24032.7,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.157862,
//                 28.467502
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER11615",
//         "orderValue": 32043.39,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.27763,
//                 28.635287
//             ]
//         },
//         "cluster": -1
//     },
//     {
//         "orderId": "ORDER61418",
//         "orderValue": 9528.36,
//         "location": {
//             "type": "Point",
//             "coordinates": [
//                 77.352271,
//                 28.557369
//             ]
//         },
//         "cluster": 14
//     }
// ]

const ClusterMap = ({ data }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (window.google && window.google.maps && mapRef.current) {
            createClusterMarkers(mapRef.current);
        }
    }, [data]);

    const onMapLoad = (map) => {
        mapRef.current = map;
        createClusterMarkers(map);
    };

    const createClusterMarkers = (map) => {
        if (!data.length) return;

        const markers = data.map((order) => {
            const { coordinates } = order.location;
            return new window.google.maps.Marker({
                position: { lat: coordinates[1], lng: coordinates[0] },
                title: `Order ID: ${order.orderId} - Value: ₹${order.orderValue}`,
            });
        });

        new MarkerClusterer({ markers, map });
    };

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={12}
            onLoad={onMapLoad}
            options={{
                streetViewControl: false,
                zoomControl: false,
                fullscreenControl: false,
                mapTypeControl: false
            }}
        />
    );
};

export default ClusterMap;
