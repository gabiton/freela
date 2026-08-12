const getServices = (services) => {
  if (Array.isArray(services)) {
    return services.filter(Boolean);
  }

  if (typeof services !== "string") {
    return [];
  }

  return services
    .split(/\r?\n/)
    .map((service) => service.trim())
    .filter(Boolean);
};

export const ProjectServiceAndDetails = ({ data, style }) => {
  const services = getServices(data.services);
  const details = Array.isArray(data.details) ? data.details : [];

  return (
    <div className={`ProjectServiceAndDetails`} >
		<div className="container">
			<div className="ProjectServiceAndDetails__headers">
				<div className="col">
					Services
				</div>
				<div className="col">
					Detail
				</div>
			</div>
			<div className="ProjectServiceAndDetails__content">
				
				<div className="col">
					{services.map((item, index) => {
            const isTextService = typeof item === "string";

            return (
              <div className="row" key={`services-${index}`}>
                {isTextService ? item : item.name}
                {!isTextService && item.position && (
                  <>
                    {` `}
                    <span>( {item.position} )</span>
                  </>
                )}
              </div>
            );
          })}
				</div>
				<div className="col">
				{details.map((item, index) => (
					<div className="row overview" key={`overview-${index}`}>
						<div className="label">
							{item.label}
						</div>
						<div className="text">
							{item.value}
						</div>
					</div>
				))}
				</div>
			</div>
		</div>
    </div>
  );
};
