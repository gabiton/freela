import Image from "next/image";
import { Text } from "@/components/Helpers/Text/Text";

export const SampleBlock = ({ data, style }) => {
  /*
  Para usar las opciones de style de los bloques
  const blockStyle = style?.className?.includes('is-style-dark') ? 'dark' : 'light'; 
  */
  
  return (
    <div className={`sample-block align-${data.image_position} `} >
      <div className="container">
        <figure>
          <Image src={data.image.url} width={1980} height={900} alt={data.image.alt} />
        </figure>
        <Text className="text-col">
          {data.text}
        </Text>
      </div>
    </div>
  );
};
