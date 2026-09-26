import {
  ArrowRight,
  Clock3,
  ShieldCheck,
  Sparkles,
  Truck,
  Leaf,
  Star,
  ShoppingBasket
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ProductCard from "../components/ProductCard";
import LoadingGrid from "../components/LoadingGrid";
import { api } from "../services/api";


export default function HomePage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    api("/products?featured=true")
      .then((data) => setProducts(data?.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));

  }, []);



  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 50
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };


  const stagger = {
    hidden: {
      opacity: 0
    },

    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };


  const categories = [
    {
      name: "Fresh Fruits",
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600"
    },
    {
      name: "Vegetables",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"
    },
    {
      name: "Dairy Products",
      image:
        "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600"
    },
    {
      name: "Bakery",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600"
    }
  ];



  return (

    <div className="overflow-hidden">


      {/* HERO SECTION */}

      <section className="relative min-h-screen flex items-center py-20">


        <motion.div

          animate={{
            y: [0, -30, 0]
          }}

          transition={{
            duration: 6,
            repeat: Infinity
          }}

          className="
          absolute
          top-20
          left-10
          h-72
          w-72
          rounded-full
          bg-green-300/30
          blur-3xl
          "

        />


        <motion.div

          animate={{
            y: [0, 40, 0]
          }}

          transition={{
            duration: 7,
            repeat: Infinity
          }}

          className="
          absolute
          right-0
          bottom-20
          h-96
          w-96
          rounded-full
          bg-orange-200/40
          blur-3xl
          "

        />



        <div className="
        container-app
        relative
        grid
        lg:grid-cols-2
        gap-14
        items-center
        ">


          <motion.div

            variants={fadeUp}

            initial="hidden"

            animate="visible"

          >


            <motion.div

              whileHover={{
                scale: 1.05
              }}

              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-green-100
              px-5
              py-2
              font-bold
              text-green-700
              "

            >

              <Sparkles size={18}/>

              Fresh grocery delivered daily

            </motion.div>



            <h1 className="
            mt-8
            text-5xl
            lg:text-7xl
            font-black
            leading-tight
            ">

              Fresh food.

              <br/>

              Healthy life.

              <br/>

              <span className="text-green-600">
                Delivered fast.
              </span>


            </h1>



            <p className="
            mt-6
            max-w-xl
            text-lg
            text-stone-600
            ">

              Shop fresh fruits, vegetables and daily essentials with trusted doorstep delivery.

            </p>



            <div className="
            mt-8
            flex
            gap-4
            flex-wrap
            ">


              <motion.div

                whileHover={{
                  scale: 1.08
                }}

                whileTap={{
                  scale: 0.95
                }}

              >

                <Link

                  to="/products"

                  className="
                  btn-primary
                  flex
                  items-center
                  gap-2
                  "

                >

                  Shop Now

                  <ArrowRight size={18}/>

                </Link>


              </motion.div>



              <Link

                to="/products"

                className="btn-secondary"

              >

                Explore Products

              </Link>


            </div>



            <div className="
            mt-12
            grid
            grid-cols-3
            gap-6
            ">


              {
                [
                  ["30+", "Minute Delivery"],
                  ["500+", "Products"],
                  ["4.9", "Rating"]

                ].map((item)=>(

                  <motion.div

                    key={item[0]}

                    whileHover={{
                      y:-10
                    }}

                  >

                    <h3 className="
                    text-3xl
                    font-black
                    ">

                      {item[0]}

                    </h3>


                    <p className="text-stone-500">

                      {item[1]}

                    </p>


                  </motion.div>

                ))
              }


            </div>


          </motion.div>

                    {/* HERO IMAGE */}

          <motion.div

            initial={{
              opacity:0,
              scale:0.8
            }}

            animate={{
              opacity:1,
              scale:1
            }}

            transition={{
              duration:1
            }}

            className="relative"

          >


            <motion.div

              animate={{
                y:[0,-20,0]
              }}

              transition={{
                duration:5,
                repeat:Infinity
              }}

            >

              <img

                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000"

                alt="Fresh grocery"

                className="
                h-[550px]
                w-full
                object-cover
                rounded-[3rem]
                shadow-2xl
                "

              />


            </motion.div>



            <motion.div

              initial={{
                opacity:0,
                y:50
              }}

              animate={{
                opacity:1,
                y:0
              }}

              transition={{
                delay:1
              }}

              className="
              absolute
              bottom-8
              left-8
              right-8
              bg-white/90
              backdrop-blur-xl
              rounded-3xl
              p-5
              shadow-xl
              "

            >


              <div className="flex items-center justify-between">


                <div>

                  <p className="
                  text-xs
                  font-bold
                  uppercase
                  text-green-600
                  ">

                    Today's Basket

                  </p>


                  <h3 className="font-black text-lg">

                    Fresh & Healthy Essentials

                  </h3>


                </div>



                <div className="
                h-14
                w-14
                rounded-2xl
                bg-green-600
                text-white
                grid
                place-items-center
                ">

                  <Truck/>

                </div>


              </div>


            </motion.div>



          </motion.div>


        </div>


      </section>





      {/* CATEGORY SECTION */}


      <section className="container-app py-20">


        <motion.div

          variants={fadeUp}

          initial="hidden"

          whileInView="visible"

          viewport={{
            once:true
          }}

          className="text-center"

        >


          <p className="
          uppercase
          tracking-[.3em]
          text-green-600
          font-bold
          ">

            Categories

          </p>


          <h2 className="
          mt-3
          text-4xl
          lg:text-5xl
          font-black
          ">

            Shop by category

          </h2>


        </motion.div>




        <motion.div

          variants={stagger}

          initial="hidden"

          whileInView="visible"

          viewport={{
            once:true
          }}

          className="
          mt-12
          grid
          md:grid-cols-4
          gap-6
          "

        >


          {
            categories.map((cat)=>(


              <motion.div

                key={cat.name}

                variants={fadeUp}

                whileHover={{
                  y:-12
                }}

                className="
                group
                overflow-hidden
                rounded-[2rem]
                bg-white
                shadow-lg
                "

              >


                <img

                  src={cat.image}

                  alt={cat.name}

                  className="
                  h-52
                  w-full
                  object-cover
                  transition
                  duration-500
                  group-hover:scale-110
                  "

                />


                <h3 className="
                p-5
                text-xl
                font-black
                ">

                  {cat.name}

                </h3>


              </motion.div>


            ))
          }


        </motion.div>


      </section>






      {/* FEATURES SECTION */}



      <section className="
      bg-green-50
      py-20
      ">


        <div className="
        container-app
        grid
        md:grid-cols-4
        gap-6
        ">


          {
            [
              [Truck,"Fast Delivery"],
              [ShieldCheck,"Quality Checked"],
              [Leaf,"Fresh Products"],
              [Clock3,"Open Everyday"]

            ].map(([Icon,title])=>(


              <motion.div

                key={title}

                whileHover={{
                  y:-10,
                  scale:1.03
                }}

                className="
                bg-white
                rounded-3xl
                p-7
                text-center
                shadow-sm
                "

              >


                <div className="
                mx-auto
                h-16
                w-16
                rounded-2xl
                bg-green-100
                text-green-600
                grid
                place-items-center
                ">

                  <Icon size={32}/>

                </div>


                <h3 className="
                mt-5
                font-black
                text-lg
                ">

                  {title}

                </h3>


              </motion.div>


            ))
          }


        </div>


      </section>






      {/* PRODUCT SECTION */}



      <section className="container-app py-20">


        <motion.div

          initial={{
            opacity:0,
            y:40
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          className="
          flex
          justify-between
          items-center
          "

        >


          <h2 className="
          text-4xl
          font-black
          ">

            Today's Fresh Picks

          </h2>



          <Link

            to="/products"

            className="
            font-bold
            text-green-700
            "

          >

            View All →

          </Link>


        </motion.div>




        {
          loading ?

          <LoadingGrid/>

          :

          <motion.div

            variants={stagger}

            initial="hidden"

            whileInView="visible"

            viewport={{
              once:true
            }}

            className="
            mt-10
            grid
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
            "

          >


            {
              (products || [])
              .slice(0,8)
              .map((product,index)=>(


                <motion.div

                  key={product?.id || index}

                  variants={fadeUp}

                  whileHover={{
                    y:-10
                  }}

                >

                  <ProductCard

                    product={product}

                    index={index}

                  />


                </motion.div>


              ))
            }


          </motion.div>

        }


      </section>

            {/* CUSTOMER REVIEWS */}


      <section className="
      bg-stone-100
      py-20
      ">


        <div className="container-app">


          <motion.div

            initial={{
              opacity:0,
              y:40
            }}

            whileInView={{
              opacity:1,
              y:0
            }}

            viewport={{
              once:true
            }}

            className="text-center"

          >


            <p className="
            uppercase
            tracking-[.3em]
            text-green-600
            font-bold
            ">

              Reviews

            </p>


            <h2 className="
            mt-3
            text-4xl
            lg:text-5xl
            font-black
            ">

              What our customers say

            </h2>


          </motion.div>





          <motion.div

            variants={stagger}

            initial="hidden"

            whileInView="visible"

            viewport={{
              once:true
            }}

            className="
            mt-12
            grid
            md:grid-cols-3
            gap-6
            "

          >


            {
              [
                {
                  name:"Rahul Sharma",
                  text:"Fresh products and super fast delivery."
                },

                {
                  name:"Priya Das",
                  text:"Amazing shopping experience with quality groceries."
                },

                {
                  name:"Amit Roy",
                  text:"Best place for daily essentials."
                }

              ].map((review)=>(


                <motion.div

                  key={review.name}

                  variants={fadeUp}

                  whileHover={{
                    y:-10
                  }}

                  className="
                  bg-white
                  rounded-[2rem]
                  p-8
                  shadow-sm
                  "

                >


                  <div className="
                  flex
                  text-yellow-500
                  ">


                    {
                      [1,2,3,4,5].map((star)=>(

                        <Star

                          key={star}

                          size={18}

                          fill="currentColor"

                        />

                      ))
                    }


                  </div>



                  <p className="
                  mt-6
                  text-stone-600
                  leading-7
                  ">

                    "{review.text}"

                  </p>



                  <h3 className="
                  mt-6
                  font-black
                  ">

                    {review.name}

                  </h3>


                </motion.div>


              ))
            }


          </motion.div>


        </div>


      </section>







      {/* FINAL CTA */}



      <section className="
      container-app
      py-20
      ">


        <motion.div

          initial={{
            opacity:0,
            scale:.9
          }}

          whileInView={{
            opacity:1,
            scale:1
          }}

          viewport={{
            once:true
          }}

          className="
          relative
          overflow-hidden
          rounded-[3rem]
          bg-green-600
          p-10
          lg:p-16
          text-center
          text-white
          "

        >



          <motion.div

            animate={{
              rotate:360
            }}

            transition={{
              duration:20,
              repeat:Infinity,
              ease:"linear"
            }}

            className="
            absolute
            -right-20
            -top-20
            h-64
            w-64
            rounded-full
            bg-white/10
            "

          />





          <motion.div

            animate={{
              y:[0,-10,0]
            }}

            transition={{
              duration:3,
              repeat:Infinity
            }}

          >

            <ShoppingBasket

              className="mx-auto"

              size={55}

            />

          </motion.div>




          <h2 className="
          relative
          mt-6
          text-4xl
          lg:text-6xl
          font-black
          ">

            Fresh groceries are waiting for you

          </h2>



          <p className="
          relative
          mt-5
          text-green-100
          text-lg
          ">

            Order fresh products today and enjoy doorstep delivery.

          </p>




          <motion.div

            whileHover={{
              scale:1.08
            }}

            whileTap={{
              scale:.95
            }}

            className="
            relative
            mt-8
            "

          >


            <Link

              to="/products"

              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white
              px-8
              py-4
              font-black
              text-green-700
              "

            >

              Start Shopping

              <ArrowRight size={18}/>

            </Link>


          </motion.div>



        </motion.div>


      </section>



    </div>

  );

}
