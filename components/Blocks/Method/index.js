const getMethodItems = (items) => {
  if (Array.isArray(items)) {
    return items.filter(Boolean);
  }

  if (typeof items !== "string") {
    return [];
  }

  return items
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
};

export const Method = ({ data, style }) => {
  /*
  Para usar las opciones de style de los bloques
  const blockStyle = style?.className?.includes('is-style-dark') ? 'dark' : 'light'; 
  */
  const methods = Array.isArray(data.methods) ? data.methods : [];

  if (!data.block_title && !methods.length) {
    return null;
  }

  return (
    <div className="Method">
      <div className="container">
        {data.block_title && (
          <div className="block__top">
            <h2>{data.block_title}</h2>
          </div>
        )}

        {methods.map((method, index) => {
          const items = getMethodItems(method.items);

          return (
            <div className="Method__item" key={`${method.title || "method"}-${index}`}>
              <div className="Method__item__text">
                {method.title && <h3>{method.title}</h3>}
                {method.text && (
                  <p dangerouslySetInnerHTML={{ __html: method.text }} />
                )}
              </div>

              {!!items.length && (
                <div className="Method__item__items">
                  {items.map((item, itemIndex) => (
                    <div key={`${item}-${itemIndex}`}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
