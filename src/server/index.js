require('dotenv').config();

const express = require('express');
const cors = require('cors');

const swaggerjsdoc = require("swagger-jsdoc")
const swaggerui = require("swagger-ui-express")

const app = express();
app.disable('x-powered-by');
app.use(cors());

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

const options = {
    swaggerDefinition: {
      openapi: "3.0.3",
      info: {
        title: "Full Stack Assignment",
        description: "This is the documentation for the API I built for my FullStack Assignment, describing usage and specifying the endpoints.",
        version: "1.0.11",
      },
      servers: [
        {
          url: "http://localhost:4000",
        },
      ],
      tags: [
        {
          name: "clients",
          description: "Endpoints related to clients",
        },
        {
          name: "users",
          description: "Endpoints related to users",
        },
        {
          name: "products",
          description: "Endpoints related to products",
        },
      ],
      paths: {
        "/clients": {
          get: {
            tags: ["clients"],
            summary: "Get all clients",
            description: "Retrieves all clients registered in the system.",
            responses: {
              '200': {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        clients: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/Client"
                          }
                        }
                      }
                    }
                  }
                }
              },
              '500': {
                description: "Error fetching clients",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  }
                }
              }
            }
          },
          post: {
            tags: ["clients"],
            summary: "Create a new client",
            description: "Creates a new client in the system.",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ClientPost"
                  }
                }
              }
            },
            responses: {
              '201': {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Client"
                    }
                  }
                }
              },
              '400': {
                description: "Missing fields in request body",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  }
                }
              },
              '500': {
                description: "Error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  }
                }
              }
            }
          }
        },
        "/clients/{clientId}": {
          delete: {
            tags: ["clients"],
            summary: "Delete client by ID",
            description: "Deletes a client by their ID.",
            parameters: [
              {
                name: "clientId",
                in: "path",
                description: "ID of the client to delete",
                required: true,
                schema: {
                  type: "integer",
                  format: "int64"
                }
              }
            ],
            responses: {
              '201': {
                description: "Client was successfully deleted"
              },
              '500': {
                description: "Error deleting client",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  }
                }
              }
            }
          }
        },
        "/": {
          get: {
            tags: ["users"],
            summary: "Get all users",
            description: "Retrieves all users registered in the system.",
            responses: {
              '200': {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        users: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/User"
                          }
                        }
                      }
                    }
                  }
                }
              },
              '500': {
                description: "Error fetching users",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  }
                }
              }
            }
          }
        },
        "/login": {
          post: {
            tags: ["users"],
            summary: "Login a registered user",
            description: "Logs user in the system.",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/UserPost"
                  }
                }
              }
            },
            responses: {
              '200': {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        user: {
                          $ref: "#/components/schemas/User"
                        }
                      }
                    }
                  }
                }
              },
              '404': {
                description: "User not in system",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  }
                }
              },
              '401': {
                description: "Invalid username or password",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  }
                }
              }
            }
          }
        },
        "/register": {
          post: {
            tags: ["users"],
            summary: "Create a new user",
            description: "Creates a new user in the system.",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/UserPost"
                  }
                }
              }
            },
            responses: {
              '201': {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/User"
                    }
                  }
                }
              },
              '409': {
                description: "The username is already taken",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  }
                }
              },
              '500': {
                description: "Error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  }
                }
              }
            }
          }
        },
        "/products": {
          get: {
            tags: ["products"],
            summary: "Get all products",
            description: "Retrieves all products available in the system.",
            responses: {
              '200': {
                description: "Successful operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        products: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/Product"
                          }
                        }
                      }
                    }
                  }
                }
              },
              '500': {
                description: "Error fetching products",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Error"
                    }
                  }
                }
              }
            }
          }
        },
        "/products/{productId}": {
          delete: {
            tags: ["products"],
            summary: "Get product by ID",
            description: "Retrieves a product by its ID.",
            parameters: [
              {
                name: "productId",
                in: "path",
                description: "ID of the product to retrieve",
                required: true,
                schema: {
                  type: "integer",
                  format: "int64"
                }
              }
            ],
            responses: {
              '200': {
                description: "Successful operation"
              },
              '404': {
                description: "Error deleting product"
              }
            }
          }
        }
      },
      components: {
        schemas: {
          Client: {
            type: "object",
            properties: {
              id: { type: "integer", format: "int64" },
              first_name: { type: "string" },
              last_name: { type: "string" },
              email: { type: "string" },
              phone_number: { type: "string" },
              company_name: { type: "string" },
              address: { type: "string" },
              city: { type: "string" },
              state: { type: "string" },
              country: { type: "string" },
              postal_code: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            }
          },
          ClientPost: {
            type: "object",
            properties: {
              id: { type: "integer", format: "int64" },
              first_name: { type: "string" },
              last_name: { type: "string" },
              email: { type: "string" },
              phone_number: { type: "string" },
              company_name: { type: "string" },
              address: { type: "string" },
              city: { type: "string" },
              state: { type: "string" },
              country: { type: "string" },
              postal_code: { type: "string" }
            }
          },
          User: {
            type: "object",
            properties: {
              id: { type: "integer", format: "int64" },
              username: { type: "string" },
              password: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            },
            required: ["username", "password"]
          },
          UserPost: {
            type: "object",
            properties: {
              username: { type: "string" },
              password: { type: "string" }
            },
            required: ["username", "password"]
          },
          Product: {
            type: "object",
            properties: {
              id: { type: "integer", format: "int64" },
              name: { type: "string" },
              price: { type: "number" },
              category: { type: "string" },
              description: { type: "string" },
              imageUrl: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            },
            required: ["name", "price"]
          },
          Error: {
            type: "object",
            properties: {
              status: { type: "string" },
              error: { type: "string" }
            }
          }
        }
      }
    },
    apis: [],
  };


const specs = swaggerjsdoc(options)
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs))

const userRouter = require('./routers/user');
app.use('/', userRouter);

const clientRouter = require('./routers/client');
app.use('/clients', clientRouter);

const productRouter = require('./routers/product');
app.use('/products', productRouter);



app.get('*', (req, res) => {
    res.json({ ok: true });
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});