require("dotenv").config()
const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../index")

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URL)
})

afterEach(async () => {
    await mongoose.connection.close()
})

describe('Resource /my-movies', () => {
    //sign in token
    it('Should return user not found', async () => {
        const response = await request(app)
            .post("/my-token")
            .set("Content-Type", "application/json")
            .send({
                email: "yuchnan123@gmail.com",
                password: "qwerty",
                token: "6969"
            })
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe("User Not Found!")
    })

    it('Should return wrong password', async () => {
        const response = await request(app)
            .post("/my-token")
            .set("Content-Type", "application/json")
            .send({
                email: "yuchnan@gmail.com",
                password: "qwerty123",
            })
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe("Wrong Password!")
    })

    it('Should return sign in token success', async () => {
        const response = await request(app)
            .post("/my-token")
            .set("Content-Type", "application/json")
            .send({
                email: "yuchnan@gmail.com",
                password: "qwerty",
                token: "6969"
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe("Sign-in Token Saved!")
    })

    //get fav movies
    it('Should return success message', async () => {
        const response = await request(app).get(
            "/my-movies/yuchnan@gmail.com/6969"
        )
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe("Get Favorite Movies Success!")
    });

    it('Should return unauthorized message', async () => {
        const response = await request(app).get(
            "/my-movies/yuchnan@gmail.com/6666"
        )
        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe("Error, unauthorized!")
    });

    //add fav movies
    it('Should return success adding favorite movies', async () => {
        const response = await request(app)
            .post("/my-movies")
            .set("Content-Type", "application/json")
            .send({
                email: "yuchnan@gmail.com",
                token: "6969",
                data: {
                    id: 1,
                    title: "random",
                    description: "test123"
                }
            })
        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe("Add Favorite Movies Success!")
    })

    it('Should return failed to save favorite movies', async () => {
        const response = await request(app)
            .post("/my-movies")
            .set("Content-Type", "application/json")
            .send({
                email: "yuchnan@gmail.com",
                token: "6666",
                data: {
                    id: 1,
                    title: "random",
                    description: "test123"
                }
            })
        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe("Error, unauthorized!")
    })

    //delete fav movies
    it('Should return movie id not found', async () => {
        const response = await request(app)
            .delete("/my-movies")
            .set("Content-Type", "application/json")
            .send({
                email: "yuchnan@gmail.com",
                token: "6969",
                movieID: 2
            })
        expect(response.statusCode).toBe(404)
        expect(response.body.message).toBe("Movie ID Not Found!")
    })

    it('Should return success remove favorite movies', async () => {
        const response = await request(app)
            .delete("/my-movies")
            .set("Content-Type", "application/json")
            .send({
                email: "yuchnan@gmail.com",
                token: "6969",
                movieID: 1
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe("Remove Favorite Movies Success!")
    })

    //sign-out token
    it('Should return sign out success', async () => {
        const response = await request(app)
            .delete("/my-token")
            .set("Content-Type", "application/json")
            .send({
                email: "yuchnan@gmail.com",
                token: "6969"
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe("Sign-out Success!")
    })

    //sign-up user
    it('Should return email not available', async () => {
        const response = await request(app)
            .post("/sign-up")
            .set("Content-Type", "application/json")
            .send({
                email: "yuchnan@gmail.com",
                password: "2222"
            })
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe("Email Not Available!")
    })

    let count = 0;
    it('Should return sign up success', async () => {
        const response = await request(app)
            .post("/sign-up")
            .set("Content-Type", "application/json")
            .send({
                email: "ramandhanu" + (count + 1) + "@gmail.com",
                password: "123"
            })
        count++;
        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe("Sign-up Success!")
    })
})