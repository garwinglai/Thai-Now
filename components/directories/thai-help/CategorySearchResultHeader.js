import React from "react";

function CategorySearchResultHeader({ title }) {
	return (
		<div className="flex justify-between items-center">
			<h3 className="text-[var(--deals-primary)]">{title}</h3>
			<select
				name="filter"
				id="filter"
				className="border rounded-full px-2 py-1 text-[color:var(--text-body-color)]"
			>
				<option value="top">Top</option>
				<option value="bottom">Bottom</option>
			</select>
		</div>
	);
}

export default CategorySearchResultHeader;
