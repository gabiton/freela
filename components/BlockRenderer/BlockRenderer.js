import { gutenbergBlocks } from "@/Blocks/index.js";
import { dashCasetoPascalCase } from "utils/dashCasetoPascalCase";

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalizeAcfBlockData = (data) => {
    if (!data || Array.isArray(data) || typeof data !== "object") {
        return data;
    }

    const normalizedData = { ...data };

    Object.keys(data).forEach((fieldName) => {
        if (fieldName.startsWith("_") || Array.isArray(data[fieldName])) {
            return;
        }

        const rowsLength = Number(data[fieldName]);
        const rowPattern = new RegExp(`^${escapeRegExp(fieldName)}_(\\d+)_(.+)$`);
        const rowKeys = Object.keys(data).filter(
            (key) => !key.startsWith("_") && rowPattern.test(key)
        );

        if (!Number.isInteger(rowsLength) || rowsLength < 0 || !rowKeys.length) {
            return;
        }

        normalizedData[fieldName] = Array.from({ length: rowsLength }, (_, index) =>
            rowKeys.reduce((row, key) => {
                const match = key.match(rowPattern);

                if (Number(match[1]) === index) {
                    row[match[2]] = data[key];
                }

                return row;
            }, {})
        );
    });

    return normalizedData;
};

const hasParsedBlockData = (data) => {
    if (Array.isArray(data)) {
        return data.length > 0;
    }

    return data && typeof data === "object" && Object.keys(data).length > 0;
};

export const BlockRenderer = ({ pageBlocks }) => {
    
    if ( !pageBlocks ) return;

    let pagecontent = [];

    const parseBlock = (blocks, pagecontent) => {
        blocks.map((block) => {
            console.log("Block: ", block);
            if (block.name !== null) {
                let blockName = block.name.split("/");

                if (blockName[0] == "core") {
                    pagecontent.push(
                        <gutenbergBlocks.Core
                            key={block.id}
                            data={block.originalContent}
                            name={block.name}
                        />
                    );
                } else {
                    blockName = dashCasetoPascalCase(blockName[1]);
                    if (gutenbergBlocks[blockName]) {
                        let BlockComponent = gutenbergBlocks[blockName];

                        let blockData = block.attributes?.data || [];

                        if (block.dynamicContent) {
                            try {
                                const parsedDynamicContent = JSON.parse(block.dynamicContent);

                                if (hasParsedBlockData(parsedDynamicContent)) {
                                    blockData = parsedDynamicContent;
                                }
                            } catch (e) {
                                console.error(e); // fallback to attributes.data
                            }
                        }

                        blockData = normalizeAcfBlockData(blockData);

                        pagecontent.push(
                            <BlockComponent
                                key={block.id}
                                data={blockData}
                                style={block.attributes}
                                blockData={blockData}
                            />
                        );
                    } else {
                        console.warn(
                            "Missing component for block: " + blockName
                        );
                    }
                }
            }
        });
        
        return pagecontent;
    };

    pagecontent = parseBlock(pageBlocks, pagecontent);

    return <>{pagecontent}</>;
};
