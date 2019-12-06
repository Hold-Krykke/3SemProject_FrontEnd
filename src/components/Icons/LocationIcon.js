import React from 'react'

const LocationIcon = props => (
  <svg width={18} height={25.007} {...props}>
    <defs>
      <linearGradient
        id="prefix__a"
        x1={-0.08}
        y1={0.5}
        x2={1.08}
        y2={0.5}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#6078ea" />
        <stop offset={0.18} stopColor="#6078ea" />
        <stop offset={1} stopColor="#17ead9" />
      </linearGradient>
    </defs>
    <g data-name="maps-and-flags">
      <path
        data-name="Shape 1"
        d="M9.001 0a9.039 9.039 0 00-9 9.057c0 6.2 8.054 15.3 8.4 15.68a.807.807 0 001.206 0c.343-.384 8.4-9.483 8.4-15.68A9.039 9.039 0 009.001 0zm0 13.613a4.557 4.557 0 114.528-4.557 4.548 4.548 0 01-4.528 4.557z"
      />
    </g>
    <path
      data-name="Gradient Overlay"
      d="M982.445 2291.737c-.343-.384-8.4-9.482-8.4-15.68a9 9 0 1118 0c0 6.2-8.054 15.3-8.4 15.68a.807.807 0 01-1.206 0zm-3.925-15.68a4.528 4.528 0 104.528-4.557 4.548 4.548 0 00-4.527 4.557z"
      fill="url(#prefix__a)"
      transform="translate(-974.048 -2267)"
    />
  </svg>
)

export default LocationIcon
