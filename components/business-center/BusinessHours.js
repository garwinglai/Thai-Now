import React from "react";

function BusinessHours() {
  return (
    <div className="p-4 bg-white lg:px-0">
      <h5>Business Hours</h5>
      <div className="mt-4 flex gap-20">
        <ul className="max-w-fit flex flex-col gap-2">
          <li className="flex gap-16">
            <p className="font-light text-sm">Mon</p>
          </li>
          <li className="flex gap-16">
            <p className="font-light text-sm">Tue</p>
          </li>
          <li className="flex gap-16">
            <p className="font-light text-sm">Wed</p>
          </li>
          <li className="flex gap-16">
            <p className="font-light text-sm">Thu</p>
          </li>
          <li className="flex gap-16">
            <p className="font-light text-sm">Fri</p>
          </li>
          <li className="flex gap-16">
            <p className="font-light text-sm">Sat</p>
          </li>
          <li className="flex gap-16">
            <p className="font-light text-sm">Sun</p>
          </li>
        </ul>
        <ul className="w-full  flex flex-col gap-2">
          <li className="flex gap-16">
            <p className="font-light text-sm">8:00 AM - 5:00 PM</p>
          </li>
          <li className="flex gap-16">
            <p className="font-light text-sm">8:00 AM - 5:00 PM</p>
          </li>
          <li className="flex gap-16">
            <p className="font-light text-sm">8:00 AM - 5:00 PM</p>
          </li>
          <li className="flex gap-16">
            <p className="font-light text-sm">8:00 AM - 5:00 PM</p>
          </li>
          <li className="flex gap-16">
            <p className="font-light text-sm">8:00 AM - 5:00 PM</p>
          </li>
          <li className="flex gap-16">
            <p className="font-light text-sm">8:00 AM - 5:00 PM</p>
          </li>
          <li className="flex gap-16">
            <p className="font-light text-sm">Closed</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BusinessHours;
