import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RemoteJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRemoteJobs = async () => {
      try {
        const response = await fetch(
          "https://remotive.com/api/remote-jobs"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data.jobs);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRemoteJobs();
  }, []);

  if (loading) return <p className="p-6">Loading jobs...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <Link to={`/jobs/${job.id}`} state={job} key={job.id}>
          <div className="bg-gray-50 rounded-xl p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <img
              src={job.company_logo}
              alt={job.title}
              className="w-full h-40 object-contain bg-green-50 rounded-lg"
            />

            <h2 className="text-sm font-bold text-green-800 mt-3">
              {job.title}
            </h2>

            <p className="text-sm text-gray-600">
              {job.company_name}
            </p>

            <p className="inline-block text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full mt-3">
              {job.job_type}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RemoteJobs;