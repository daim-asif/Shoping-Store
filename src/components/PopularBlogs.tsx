import { MessageCircle , ThumbsUp} from 'lucide-react';

const PopularBlogs = () => {

  const blogs = [

    {
      title: "Mastering the Art of Minimalist Coding",
      author: "John Maverick",
      likes: 124,
      comments: 44,
    },
    {
      title: "Top 10 Developer Habits That Drive Success",
      author: "John Maverick",
      likes: 153,
      comments: 25,
    },
    {
      title: "Breaking Down Complex Code Like a Pro",
      author: "Daim ",
      likes: 100,
      comments: 50,
    },

  ]

  return (
    <div className="bg-white p-5 w-[23rem] mt-4 border ml-5 rounded">
      <h2 className="text-xl font bold md-5">Popular Blogs</h2>    
      <ul>
        {blogs.map((blog , index) => (
          <li key={index} className="md-5">
            <div className="flex justify-between items-center">
              <span className="font-bold md-2">{blog.title}</span>
            </div>
            <span className="text-gray-600">Published by {blog.author}</span>
            <div className="flex items-center mt-2">
              <MessageCircle size={20}/>
              <span className="text-gray-500 mr-5 ml-1">{ blog.likes }</span>

              <ThumbsUp size={20}/>

              <span className="text-gray-500 mr-2 ml-2">{ blog.comments }</span>

            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PopularBlogs