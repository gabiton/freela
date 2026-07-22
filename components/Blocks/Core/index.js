import { Observer } from "@/components/Helpers/Observer"

export const Core = ({ data, name }) => {
	return (
		<Observer className={` coreBlock container ${name.replace('/',"_")}`} ><span dangerouslySetInnerHTML={{ __html: data }}></span></Observer>
	);
};
