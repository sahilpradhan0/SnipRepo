import { useEffect } from "react";
import Prism from "prismjs";

export default function usePrismLanguages() {
    useEffect(() => {
        // Load dependencies in a stable order
        (async () => {
            try {
                await import("prismjs/components/prism-clike");
                await import("prismjs/components/prism-markup");
                await import("prismjs/components/prism-javascript");
                await import("prismjs/components/prism-markup-templating");
                await import("prismjs/components/prism-css");

                // Then safely load others
                await Promise.all([
                    import("prismjs/components/prism-typescript"),
                    import("prismjs/components/prism-jsx"),
                    import("prismjs/components/prism-tsx"),
                    import("prismjs/components/prism-php"),
                    import("prismjs/components/prism-java"),
                    import("prismjs/components/prism-csharp"),
                    import("prismjs/components/prism-cpp"),
                    import("prismjs/components/prism-python"),
                    import("prismjs/components/prism-ruby"),
                    import("prismjs/components/prism-go"),
                    import("prismjs/components/prism-rust"),
                    import("prismjs/components/prism-swift"),
                    import("prismjs/components/prism-kotlin"),
                    import("prismjs/components/prism-sql"),
                    import("prismjs/components/prism-bash"),
                ]);
            } catch (err) {
                console.error("Prism language loading failed:", err);
            }
        })();
    }, []);
}
