import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },

  handler: async (ctx, args) => {
    // If user already exist in Table
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .collect();

    if (user?.length == 0) {
      // If not Then only -> add user to Table
      const data = {
        name: args.name,
        email: args.email,
        picture: args.picture,
        createdAt: Date.now(),
      };

      const result = await ctx.db.insert("users", data);
      return result;
    }
    return user[0]; // If user already exist then return user data
  },
});

export const GetUser=query({
  args:{
    email:v.string()
  },
  handler:async (ctx,args)=>{
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .collect();

    return user[0];
  }
})
