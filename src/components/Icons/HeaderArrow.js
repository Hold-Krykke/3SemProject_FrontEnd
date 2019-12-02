import React from 'react'

const HeaderArrow = props => (
  <svg width={33.494} height={11.771} {...props}>
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
        <stop offset={0.357} stopColor="#6078ea" />
        <stop offset={1} stopColor="#17ead9" />
      </linearGradient>
    </defs>
    <path
      data-name="Shape 1"
      d="M.316 5.822s12.133 9.88 25.459-.469"
      fill="none"
      stroke="#6078ea"
      strokeDasharray="4 2"
    />
    <g data-name="arrow-point-to-right">
      <path
        data-name="Forma 1"
        d="M32.383 5.869l-3.901 5.44a.809.809 0 01-1.094.203.735.735 0 01-.194-1.05l3.453-4.809L25.702 2.4a.735.735 0 01-.196-1.054.809.809 0 011.093-.202l5.59 3.677a.735.735 0 01.194 1.049z"
      />
    </g>
    <path
      data-name="Gradient Overlay"
      d="M698.073 49.69a.734.734 0 01-.194-1.05l3.452-4.812-4.946-3.258a.735.735 0 01-.194-1.05.81.81 0 011.094-.2l5.588 3.68a.736.736 0 01.194 1.05l-3.9 5.439a.8.8 0 01-.655.333.794.794 0 01-.439-.132z"
      fill="url(#prefix__a)"
      transform="translate(-670.684 -38.178)"
    />
  </svg>
)

export default HeaderArrow