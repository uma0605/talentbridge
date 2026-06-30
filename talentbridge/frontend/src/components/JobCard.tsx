import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock } from 'lucide-react';
import { Job } from '../data/jobs';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all group"
    >
      <div className="flex items-start space-x-4">
        <img
          src={job.logo}
          alt={job.company}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
            {job.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{job.company}</p>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
          {job.type}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap justify-between items-center text-sm text-gray-500 gap-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {job.location}
          </span>
          <span className="flex items-center">
            <Briefcase className="w-4 h-4 mr-1" />
            {job.salary}
          </span>
        </div>
        <span className="flex items-center text-gray-400">
          <Clock className="w-4 h-4 mr-1" />
          {job.posted}
        </span>
      </div>
    </Link>
  );
}
