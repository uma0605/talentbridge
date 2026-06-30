import { Link } from 'react-router-dom';
import { ArrowRight, Search, MapPin, Briefcase, Users, Building2, TrendingUp } from 'lucide-react';
import { jobs, companies } from '../data/jobs';
import JobCard from '../components/JobCard';

export default function HomePage() {
  const featuredJobs = jobs.slice(0, 6);

  const stats = [
    { label: 'Active Jobs', value: '12,500+', icon: Briefcase },
    { label: 'Companies', value: '3,200+', icon: Building2 },
    { label: 'Job Seekers', value: '150,000+', icon: Users },
    { label: 'Success Rate', value: '94%', icon: TrendingUp },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Find Your Dream Career
              <br />
              <span className="text-blue-200">With TalentBridge</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Connect with top employers and discover opportunities that match your skills. Your perfect career is just a click away.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>

            {/* Quick Links */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="text-blue-200 text-sm">Popular:</span>
              {['React Developer', 'Product Designer', 'Data Scientist', 'DevOps Engineer'].map((term) => (
                <Link
                  key={term}
                  to={`/jobs?q=${encodeURIComponent(term)}`}
                  className="px-3 py-1 bg-white/10 text-white text-sm rounded-full hover:bg-white/20 transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-3">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
              <p className="text-gray-600 mt-2">Discover opportunities from top employers</p>
            </div>
            <Link
              to="/jobs"
              className="hidden md:flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>View all jobs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              to="/jobs"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            >
              <span>View all jobs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Top Companies Hiring</h2>
            <p className="text-gray-600 mt-2">Join industry leaders building the future</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Link
                key={company.id}
                to={`/companies/${company.id}`}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all group"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-500">{company.industry}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{company.location}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{company.employees} employees</span>
                  <span className="text-sm font-medium text-blue-600">{company.openJobs} open jobs</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
            Create your free account today and get access to thousands of job opportunities from top companies.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Join as Job Seeker
            </Link>
            <Link
              to="/company/register"
              className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-400 transition-colors"
            >
              Post Jobs as Employer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
