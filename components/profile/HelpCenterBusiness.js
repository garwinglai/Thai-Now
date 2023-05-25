import React from "react";
import styles from "@/styles/components/profile/help-center.business.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { businessFaq } from "@/helper/db/staticData";
import HelpCenterAccordian from "./HelpCenterAccordian";

function HelpCenterBusiness() {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div className={`${styles.help_panel_box}`}>
			{businessFaq.map((faq) => {
				const { id, question, answer, panelName } = faq;
				return (
					<HelpCenterAccordian
						key={id}
						id={id}
						question={question}
						answer={answer}
						panelName={panelName}
					/>
				);
			})}
		</div>
	);
}

export default HelpCenterBusiness;
