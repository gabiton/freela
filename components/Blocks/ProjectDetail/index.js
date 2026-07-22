export const ProjectDetail = ({ data, style }) => {
  const roles = Array.isArray(data.role) ? data.role : [];
  const team = Array.isArray(data.team) ? data.team : [];
  const overview = Array.isArray(data.overview) ? data.overview : [];

  return (
    <div className={`ProjectDetail`} >
		<div className="container">
			<div className="ProjectDetail__headers">
				<div className="col">
					Role
				</div>
				<div className="col">
					Team
				</div>
				<div className="col">
					Overview
				</div>
			</div>
			<div className="ProjectDetail__content">
				<div className="col">
					{roles.map((item, index) => (
						<div className="row" key={`role-${index}`}>
							{item.role}
						</div>						
					))}
				</div>
				<div className="col">
					{team.map((item, index) => (
						<div className="row" key={`team-${index}`}>
							{item.name}{` `}
							<span>( {item.position} )</span>
						</div>						
					))}
				</div>
				<div className="col">
				{overview.map((item, index) => (
					<div className="row overview" key={`overview-${index}`}>
						<div className="label">
							{item.label}
						</div>
						<div className="text">
							{item.text}
						</div>
					</div>
				))}
				</div>
			</div>
		</div>
    </div>
  );
};
