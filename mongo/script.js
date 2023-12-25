// Find all posts created in the last 30 days with more than 10 likes.

db.posts.find({
  createdAt: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) },
  likes: { $gt: 10 }
});



// Find all comments with a specific word in a nested array
db.posts.find({
    "comments.text": { $regex: /awesome/i }
  });


//   Increment the number of views for a specific post.
  db.posts.update(
    { _id: ObjectId("post_id") },
    { $inc: { views: 1 } }
  );
  

//   Update the status of all open orders to "completed" if the delivery date has passed.
db.orders.update(
    { status: "open", deliveryDate: { $lt: new Date() } },
    { $set: { status: "completed" } },
    { multi: true }
  );


//   Search for posts containing a specific keyword using the text search index.
  db.posts.find({ $text: { $search: "MongoDB" } });


//   Find posts created between two dates and sort them by the number of likes in descending order.
  db.posts.find({
    createdAt: { $gte: ISODate("2022-01-01"), $lte: ISODate("2022-12-31") }
  }).sort({ likes: -1 });


//   Find authors who have written more than five posts
db.authors.find({ "posts": { $exists: true, $size: { $gt: 5 } } });


// Find posts where at least one comment has the word "question."
db.posts.find({
    comments: { $elemMatch: { text: { $regex: /question/i } } }
  });

  








//   Find all orders with details, including product information, using the $lookup stage.
db.orders.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails"
      }
    }
  ]);

  
//   Calculate the total revenue for each product category and classify them as "High" or "Low" based on revenue.
db.sales.aggregate([
    {
      $group: {
        _id: "$category",
        totalRevenue: { $sum: "$amount" }
      }
    },
    {
      $project: {
        _id: 1,
        category: 1,
        revenueClassification: {
          $cond: {
            if: { $gte: ["$totalRevenue", 100000] },
            then: "High",
            else: "Low"
          }
        }
      }
    }
  ]);

  
//   Calculate the average number of comments per post for a specific author.
db.posts.aggregate([
    { $match: { author: "JohnDoe" } },
    {
      $group: {
        _id: "$author",
        averageComments: { $avg: "$comments.length" }
      }
    }
  ]);
  
  
  