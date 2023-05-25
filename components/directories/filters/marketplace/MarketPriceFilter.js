import React from "react";
import styles from "@/styles/components/directory/filters/marketplace/market-price-filter.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function MarketPriceFilter() {
	return (
		<div className={`${styles.market_price_box}`}>
			<h4>Price</h4>
			<div className={`${styles.range_box} ${styles.flexCol}`}>
				<p>Range:</p>
				<div className={`${styles.flex} ${styles.input_group_both}`}>
					<div className={`${styles.flexCol} ${styles.input_box}`}>
						<input id="min-salary" type="text" placeholder="$100" />
						<label htmlFor="min-salary">Min</label>
					</div>

					<div className={`${styles.flexCol} ${styles.input_box}`}>
						<input id="max-salary" type="text" placeholder="$300" />
						<label htmlFor="max-salary">Max</label>
					</div>
				</div>
			</div>
			<div className={`${styles.radio_box}`}>
				<FormControl sx={{ width: "100%", marginLeft: "-16px" }}>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="hourly"
						name="radio-buttons-group"
					>
						<FormControlLabel
							value="negotiate"
							control={<Radio />}
							label="Negotiate Price"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="market"
							control={<Radio />}
							label="Market Price"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
					</RadioGroup>
				</FormControl>
			</div>
		</div>
	);
}

export default MarketPriceFilter;
