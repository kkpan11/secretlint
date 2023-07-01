import path from "path";
import { creator as rule } from "../src/index";

(async function () {
    const snapshot = (await import("@secretlint/tester")).snapshot;
    describe("@secretlint/secretlint-rule-pattern", () => {
        snapshot({
            defaultConfig: {
                rules: [
                    {
                        id: "@secretlint/secretlint-rule-pattern",
                        rule,
                        options: {
                            patterns: [
                                {
                                    name: "password=",
                                    pattern:
                                        "/password\\s*=\\s*(?<password>[\\w\\d!@#$%^&(){}\\[\\]:\";'<>,.?/~`_+-=|]{1,256})\\b.*/gi",
                                },
                            ],
                            allows: ["foo-bar"],
                        },
                    },
                ],
            },
            updateSnapshot: !!process.env.UPDATE_SNAPSHOT,
            snapshotDirectory: path.join(__dirname, "snapshots"),
        }).forEach((name, test) => {
            it(name, async function () {
                const status = await test();
                if (status === "skip") {
                    this.skip();
                }
            });
        });
    });
})();
