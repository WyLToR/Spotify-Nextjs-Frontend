import {Html, Head, Main, NextScript} from "next/document";
import {ReactQueryProvider} from "@/components/utils/ReactQueryProvider";

export default function Document() {

    return (
        <Html lang="en">
            <ReactQueryProvider>
                <Head/>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </ReactQueryProvider>
        </Html>
    );
}
