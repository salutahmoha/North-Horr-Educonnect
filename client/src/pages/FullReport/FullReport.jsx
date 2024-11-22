// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery } from 'react-query';
// import EduNavbar from '../EduNavbar/EduNavbar';
// import { FullReportContainer, TitleStyled, ImageStyled, BodyStyled } from '../../components/StyledComponents/FullReportStyled';
// import apiBase from '../../utils/apiBase';

// function FullReport() {
//     const { id } = useParams();  // Get the report ID from the URL

//     const { isLoading, isError, error, data } = useQuery({
//         queryKey: ['report', id],
//         queryFn: async () => {
//             if (!id) throw new Error('Report ID is undefined');
        
//             const response = await fetch(`${apiBase}/reports/${id}`, { credentials: 'include' });
        
//             if (response.status === 404) {
//                 throw new Error('Report not found');
//             }
        
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'An error occurred');
//             }
        
//             return await response.json();
//         },
//     });

//     if (isLoading) {
//         return <h2>Loading, please wait...</h2>;
//     }

//     if (isError) {
//         return <h2>{error.message}</h2>;
//     }

//     const report = data;

//     return (
//         <div>
//             <EduNavbar />
//             <FullReportContainer>
//                 <TitleStyled>{report.schoolname}</TitleStyled>
//                 <BodyStyled dangerouslySetInnerHTML={{ __html: report.body }} />
//                 <ImageStyled src={report.image} alt={report.schoolname} />
//             </FullReportContainer>
//         </div>
//     );
// }

// export default FullReport;
