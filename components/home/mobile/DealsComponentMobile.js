import React from "react";
import { IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DealsCard from "../cards/DealsCard";
import { dealsOfWeek } from "@/helper/db/staticData";
import styles from "../../../styles/components/home/mobile/deals-component-mobile.module.css";

function DealsComponentMobile({ title }) {
	return (
		<div className={`${styles.deals_mobile_container}`}>
			<div className={`${styles.header}`}>
				<h3>{title}</h3>
				<IconButton>
					<ChevronRightIcon fontSize="large" />
				</IconButton>
			</div>
			<div className={`${styles.deal_cards_container}`}>
				{dealsOfWeek.map((deal, idx) => {
					return <DealsCard key={idx} deal={deal} title={title} />;
				})}
			</div>
		</div>
	);
}

export default DealsComponentMobile;
