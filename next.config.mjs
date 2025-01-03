/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'rentitup.s3.amazonaws.com',
                port:'',
                pathname:'/**'

            }
        ]
    }
};

export default nextConfig;
