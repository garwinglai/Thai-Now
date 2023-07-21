import React from "react";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import LinearProgress, {
	linearProgressClasses,
} from "@mui/material/LinearProgress";

function ReviewStats() {
	return (
		<div className="flex items-center gap-3 pt-4 pb-8 px-3 lg:w-1/2">
			<div className="flex flex-col justify-center items-center">
				<div className=" w-20 h-20 flex items-center justify-center rounded-full border-4 border-[color:var(--housing-primary)] ">
					<h3 className="">4.96</h3>
				</div>
				<p className="font-light text-xs">20 Reviews</p>
			</div>
			<div className="flex flex-col gap-1">
				<Rating
					name="size-small"
					defaultValue={5}
					sx={{ color: "var(--black)", fontSize: "10px" }}
					readOnly
				/>
				<Rating
					name="size-small"
					defaultValue={4}
					sx={{ color: "var(--black)", fontSize: "10px" }}
					readOnly
				/>
				<Rating
					name="size-small"
					defaultValue={3}
					sx={{ color: "var(--black)", fontSize: "10px" }}
					readOnly
				/>
				<Rating
					name="size-small"
					defaultValue={2}
					sx={{ color: "var(--black)", fontSize: "10px" }}
					readOnly
				/>
				<Rating
					name="size-small"
					defaultValue={1}
					sx={{ color: "var(--black)", fontSize: "10px" }}
					readOnly
				/>
			</div>
			<div className="flex flex-col gap-[10px] w-full">
				<BorderLinearProgress
					variant="determinate"
					value={90}
					sx={{ borderRadius: "45px" }}
				/>
				<BorderLinearProgress
					variant="determinate"
					value={20}
					sx={{ borderRadius: "45px" }}
				/>
				<BorderLinearProgress
					variant="determinate"
					value={0}
					sx={{ borderRadius: "45px" }}
				/>
				<BorderLinearProgress
					variant="determinate"
					value={0}
					sx={{ borderRadius: "45px" }}
				/>
				<BorderLinearProgress
					variant="determinate"
					value={0}
					sx={{ borderRadius: "45px" }}
				/>
			</div>
		</div>
	);
}

export default ReviewStats;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	// height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor:
			theme.palette.mode === "light" ? "var(--secondary)" : "var(--secondary)",
	},
}));
