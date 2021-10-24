import React from "react";

export const withBorder = (story: () => React.ReactNode) => <div className="min-h-screen p-16 bg-green-100"><div className="bg-white">{story()}</div></div>
