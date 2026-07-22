import { Text } from "@/components/Helpers/Text/Text";

export const TextSectionBlock = ({ data, style }) => {
	const text = data.text?.replace(/\[([^\]]+)\]/g, "<strong>$1</strong>");

  return (
    <div className={`TextSectionBlock`}>
		<div className="container">
			{data.subtitle && 
			<h3>
				{data.subtitle}
			</h3>
			}
			{data.title && 
			<h2>
				{data.title}
			</h2>
			}
			{data.text &&
			<Text className="TextSectionBlock__text">
				{text}
			</Text>
			}
		</div>
    </div>
  );
};
