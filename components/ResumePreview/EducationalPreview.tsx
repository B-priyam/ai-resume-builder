import React from 'react'

const EducationalPreview = ({resumeInfo}:any) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {
        resumeInfo?.education.map((education:any,index:number)=>(
            <div key={index}>
                <h2 className='text-sm font-bold'>
                    {education?.universityName}
                </h2>
                <h2 className='text-xs flex justify-between'>{education?.degree} in {education?.major}
                    <span>{education?.startDate} - {education?.endDate}</span>
                </h2>
                <p className='text-xs my-2'>
                    {education?.description}
                </p>
            </div>
        ))
      }
    </div>
  );
}

export default EducationalPreview