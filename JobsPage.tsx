import { useState } from 'react';
import { Search, MapPin, Filter, Briefcase } from 'lucide-react';
import { jobs } from '../data/jobs';
import JobCard from '../components/JobCard';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !typeFilter || job.type === typeFilter;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white text-center mb-6">Find Your Perfect Job</h1>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-3 flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center px-3 py-2 bg-gray-50 rounded-lg">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Job title, skills, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
            <div className="flex-1 flex items-center px-3 py-2 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <div className="space-y-2">
                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={typeFilter === type}
                          onChange={() => setTypeFilter(typeFilter === type ? '' : type)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option value="">Any salary</option>
                    <option value="50">$50k+</option>
                    <option value="75">$75k+</option>
                    <option value="100">$100k+</option>
                    <option value="150">$150k+</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                <span className="font-medium text-gray-900">{filteredJobs.length}</span> jobs found
              </p>
              <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white">
                <option>Most Recent</option>
                <option>Most Relevant</option>
                <option>Highest Salary</option>
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500">Try adjusting your search filters</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
