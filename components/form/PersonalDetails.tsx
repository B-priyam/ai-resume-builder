import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { HTMLInputTypeAttribute, useContext, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useParams } from 'next/navigation';
import globalApi from '@/lib/globalApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { EnableNextProps } from '@/lib/types';

const PersonalDetails = () => {
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value,
    });

    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();

    const data = { data: formData };
    console.log(data)
    const res = await globalApi.updateResumeDeatils(params?.resumeId,data)
    toast("Details Updated")
    setLoading(false)
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with the basic information</p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label htmlFor="firstName">first Name</label>
            <Input
              autoFocus
              name="firstName"
              id="firstName"
              required
              placeholder="eg: Priyam"
              onChange={handleInputChange}
              defaultValue={resumeInfo?.firstName}
            />
          </div>
          <div>
            <label htmlFor="lastName">last Name</label>
            <Input
              name="lastName"
              id="lastName"
              required
              placeholder="eg: Bhardwaj"
              defaultValue={resumeInfo?.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="jobTitle">Job Title</label>
            <Input
              placeholder="eg: Full stack developer"
              name="jobTitle"
              id="jobTitle"
              required
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="address">Address</label>
            <Input
              placeholder="eg: mumbai,maharashtra"
              name="address"
              id="address"
              required
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <Input
              placeholder="eg: +91 1234567891"
              name="phone"
              id="phone"
              required
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              placeholder="eg: mymail@dummy.com"
              name="email"
              id="email"
              required
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="github">Github</label>
            <Input
              placeholder="eg: https://github.com/your-name"
              name="github"
              id="github"
              required
              defaultValue={resumeInfo?.github}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="linkedIn">LinkedIn</label>
            <Input
              placeholder="eg: www.linkedin.com/in/your-name"
              name="linkedIn"
              id="linkedIn"
              required
              defaultValue={resumeInfo?.linkedIn}
              onChange={handleInputChange}
            />
          </div>
          <div className='col-span-2'>
            <label htmlFor="portfolio">Portfolio Url</label>
            <Input
              placeholder="eg: https://my-portfolio.com"
              name="portfolio"
              id="portfolio"
              required
              defaultValue={resumeInfo?.portfolio}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button
            className="bg-primary hover:bg-purple-600 "
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin " />}Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails