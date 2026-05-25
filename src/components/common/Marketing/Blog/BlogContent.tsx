interface Block {
  type: string;
  data: any;
}

interface EditorContent {
  blocks: Block[];
}

const BlogContent = ({ content }: { content: EditorContent }) => {
  if (!content?.blocks) return null;

  return (
    <div className="space-y-4 text-gray-800 text-sm sm:text-base leading-relaxed">
      {content.blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );

          case "header":
            const Tag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
            const headerClass: Record<number, string> = {
              1: "text-3xl font-extrabold text-gray-900 mt-8 mb-4",
              2: "text-2xl font-bold text-gray-900 mt-6 mb-3",
              3: "text-xl font-bold text-gray-800 mt-5 mb-2",
              4: "text-lg font-semibold text-gray-800 mt-4 mb-2",
              5: "text-base font-semibold text-gray-700 mt-3 mb-1",
              6: "text-sm font-semibold text-gray-700 mt-3 mb-1",
            };
            return (
              <Tag
                key={i}
                className={headerClass[block.data.level] ?? "font-bold"}
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );

          case "list":
            const ListTag = block.data.style === "ordered" ? "ol" : "ul";
            return (
              <ListTag
                key={i}
                className={`pl-6 space-y-1 ${
                  block.data.style === "ordered" ? "list-decimal" : "list-disc"
                }`}
              >
                {block.data.items.map((item: string, j: number) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ListTag>
            );

          case "image":
            return (
              <figure key={i} className="my-6">
                <img
                  src={block.data.file?.url}
                  alt={block.data.caption ?? ""}
                  className="w-full rounded-xl object-cover max-h-[500px]"
                />
                {block.data.caption && (
                  <figcaption className="text-center text-xs text-gray-400 mt-2 italic">
                    {block.data.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-primary pl-5 py-2 my-4 bg-primary/5 rounded-r-xl"
              >
                <p
                  className="italic text-gray-700"
                  dangerouslySetInnerHTML={{ __html: block.data.text }}
                />
                {block.data.caption && (
                  <cite className="text-xs text-gray-400 mt-1 block not-italic">
                    — {block.data.caption}
                  </cite>
                )}
              </blockquote>
            );

          case "code":
            return (
              <pre
                key={i}
                className="bg-gray-900 text-green-400 rounded-xl p-4 overflow-x-auto text-sm font-mono"
              >
                <code>{block.data.code}</code>
              </pre>
            );

          case "delimiter":
            return <hr key={i} className="border-gray-200 my-8" />;

          case "table":
            return (
              <div key={i} className="overflow-x-auto my-4">
                <table className="w-full border-collapse text-sm">
                  {block.data.content?.map((row: string[], rowIdx: number) => (
                    <tr
                      key={rowIdx}
                      className={rowIdx === 0 ? "bg-gray-100" : ""}
                    >
                      {row.map((cell: string, cellIdx: number) => {
                        const Cell = rowIdx === 0 ? "th" : "td";
                        return (
                          <Cell
                            key={cellIdx}
                            className="border border-gray-200 px-4 py-2 text-left"
                            dangerouslySetInnerHTML={{ __html: cell }}
                          />
                        );
                      })}
                    </tr>
                  ))}
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlogContent;
