import { useRouter } from "next/router";
import { useEffect } from "react";

export default function GrouparooWWW(props) {
    const router = useRouter();

    useEffect(() => storePathValues, [router.asPath]);

    function storePathValues() {
        const storage = globalThis?.sessionStorage;
        if (!storage) return;
        // Set the previous path as the value of the current path.
        const prevPath = storage.getItem("currentPath");
        storage.setItem("prevPath", prevPath);
        // Set the current path value by looking at the browser's location object.
        storage.setItem("currentPath", globalThis.location.pathname);
    }

    // ...
}