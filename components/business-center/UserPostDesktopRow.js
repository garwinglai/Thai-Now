import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import news_image from "@/public/static/images/business_temp_img.png";
import Image from "next/image";

function UserPostDesktopRow({ even }) {
  return (
    <tr className={`border-b ${even && `bg-[color:var(--row-bg)]`}`}>
      <td className="text-center w-1/12">
        <input
          type="checkbox"
          className="form-checkbox accent-[color:var(--deals-primary-med)] w-4 h-4 rounded border-[color:var(--placeholder-color)] focus:ring-0"
        />
      </td>
      <td className="text-xs font-light text-left py-2 w-3/12">
        <div className="flex items-center gap-4">
          <Image
            src={news_image}
            alt="post image"
            className="w-8 h-8 rounded-md"
          />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </td>
      <td className="text-xs font-light text-left py-2 pr-5 w-1/12">House</td>
      <td className="text-xs font-light text-left py-2 pr-5 w-1/12">
        $10.00/night
      </td>
      <td className="text-xs font-light text-left py-2 pr-5 w-2/12">
        500 W sunset Los Angeles, CA 90028
      </td>
      <td className="text-xs font-light text-center py-2 w-2/12">
        May 09 2023
      </td>
      <td className="text-xs font-light text-center py-2 w-2/12">
        <div className="flex justify-center">
          <IconButton>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </div>
      </td>
    </tr>
  );
}

export default UserPostDesktopRow;