import { Link } from "react-router-dom";

const categories = [
  {
    name: "Crypto",
    count: 124,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    name: "Economics",
    count: 97,
    color: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  {
    name: "Politics",
    count: 83,
    color: "bg-red-500/10 text-red-500 border-red-500/20",
  },
  {
    name: "Sports",
    count: 112,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    name: "Technology",
    count: 76,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  {
    name: "Entertainment",
    count: 62,
    color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  },
];

export const CategoriesSection = () => (
  <section className="py-16 bg-card/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground">
          Explore Market Categories
        </h2>
        <p className="text-muted-foreground mt-2">
          Discover prediction markets across different domains
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, i) => (
          <Link to={`/markets?category=${category.name}`} key={i}>
            <div
              className={`border ${category.color} rounded-xl p-4 text-center hover:scale-105 transition-all`}
            >
              <p className="font-bold">{category.name}</p>
              <p className="text-sm">{category.count} markets</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
