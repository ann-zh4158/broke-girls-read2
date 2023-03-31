// just an array of free, public proxies to rotate while web scraping -____- 
// BEWARE of security risk --> DO NOT SEND REQS WITH SENSITIVE DATA

const protocol = 'http';  // we will mostly be making http protocols
const proxies = [
    {
        protocol: protocol,
        host: '110.185.164.20',
        port: 9091
    },
    {
        protocol: protocol,
        host: '64.225.8.121',
        port: 9985
    },
    {
        protocol: protocol,
        host: '120.194.4.157',
        port: 5443
    },
    {
        protocol: protocol,
        host: '218.158.60.22',
        port: 443
    },
    {
        protocol: protocol,
        host: '117.160.250.130',
        port: 8899
    },
    {
        protocol: protocol,
        host: '64.225.4.12',
        port: 9982
    },
    {
        protocol: protocol,
        host: '47.92.247.250',
        port: 5566
    },
    {
        protocol: protocol,
        host: '121.37.203.216',
        port: 1337
    },
    {
        protocol: protocol,
        host: '47.98.134.232',
        port: 41890
    },
    {
        protocol: protocol,
        host: '106.14.47.96',
        port: 10051
    },
    {
        protocol: protocol,
        host: '43.129.177.167',
        port: 6666
    },
    {
        protocol: protocol,
        host: '187.62.191.3',
        port: 61456
    },
    {
        protocol: protocol,
        host: '120.236.79.139',
        port: 9002
    },
    {
        protocol: protocol,
        host: '200.105.215.22',
        port: 33630
    },
    {
        protocol: protocol,
        host: '144.172.126.55',
        port: 8090
    }
    
];

export default proxies;