import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`https://remotive.com/api/remote-jobs?search=${id}`);
        const data = await response.json();
        const foundJob = data.jobs.find(
        (job) => job.toString() === id);
      
        setJob(foundJob);
      } catch (error) {
        console.error("Error fectching job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

if (loading) return <p>Loading job...</p>;

  if (!job) return <p>Job not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={job.company_logo}
        alt={job.title}
        className="w-40 mb-4"
      />

      <h1 className="text-2xl font-bold mb-2">
        {job.title}
      </h1>

      <p className="text-gray-600 mb-2">
        {job.company_name}
      </p>

      <p className="mb-4">
        {job.candidate_required_location}
      </p>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: job.description }}
      />

      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 px-6 py-3 bg-green-800 text-white rounded-lg"
      >
        Apply on Company Site
      </a>
    </div>
  );
};

export default JobDetails;