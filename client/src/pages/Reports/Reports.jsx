// import React, { useEffect, useState } from 'react';
// import EduNavbar from '../EduNavbar/EduNavbar';
// import { useQuery } from 'react-query';
// import apiBase from '../../utils/apiBase';
// import ReportPreview from '../../components/Previews/ReportPreview'

// function Reports() {
//     const { isLoading, isError, error, data } = useQuery({
//         queryKey: ['reports'],
//         queryFn: async () => {
//           const response = await fetch(`${apiBase}/reports`, { credentials: "include" });
//           if (!response.ok) {
//             const error = await response.json();
//             throw new Error(error.message);
//           }
//           return response.json();
//         }
//       });

//       if (isLoading) {
//         return <h2>Loading, please wait...</h2>;
//       }
      
//       if (isError) {
//         return <h2>{error.message}</h2>;
//       }
      
//       const sortedReports = data ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
      
//       return (
//         <div>
//           <EduNavbar />
//           <div>
//             {sortedReports.map((report, i) => (
//               <ReportPreview
//                 key={i}
//                 id={report.id}
//                 schoolname={report.schoolname}
//                 body={report.body}
//                 image={report.image}
//               />
//             ))}
//           </div>
//         </div>
//       )
// }

// export default Reports