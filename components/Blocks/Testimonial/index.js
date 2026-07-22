import { Text } from "@/components/Helpers/Text/Text";

export const Testimonial = ({ data, style }) => {
	const text = data.text?.replace(/\[([^\]]+)\]/g, "<strong>$1</strong>");

  return (
    <div className={`Testimonial`}>
		<div className="container">
			<div className="Testimonial__content">
				<h3>
				TESTIMONIAL
				</h3>
				<div className="Testimonial__text">
					{data.text &&
					<Text className="Testimonial__text__quote">
						{text}
					</Text>
					}
					<div className="Testimonial__text__author">
						{data.author}
						{data.position &&
							<span>
								{data.position}
							</span>
						}
					</div>
				</div>
			</div>
		</div>
    </div>
  );
};
