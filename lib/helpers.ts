import globalApi from "./globalApi";
import { CertificateList, EducationalListProps, ExperienceListProps, ProjectList, SkillProps } from "./types";


export const OnSaveHelper = async (
  listType: CertificateList[] | ProjectList[] | EducationalListProps[] |ExperienceListProps[] | SkillProps[],
  resumeId: string | string[] | undefined,
  field : string
) => {
    const newList = listType.map(({ id, ...listType }) => listType);
    const cleanedArray = newList.map((obj) => {
      if (obj != null && typeof obj === "object") {
        const updatedObj = { ...(obj as object) };
        for (const key in updatedObj) {
          if (!updatedObj[key as keyof typeof updatedObj]) {
            delete updatedObj[key as keyof typeof updatedObj];
          }
        }
        return updatedObj;
      }
      return obj;
    });
    const data = {
      data: {
        [field]: cleanedArray,
      },
    };

    try {
      const resp = await globalApi.updateResumeDeatils(resumeId, data);
      return "data updated successfully"
    } catch (error) {
      return "Error in updating data"
    }
};