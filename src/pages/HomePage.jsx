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

import ProductCard from "../components/ProductCard";
import LoadingGrid from "../components/LoadingGrid";
import { api } from "../services/api";


export default function HomePage() {

  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(true);


  useEffect(()=>{

    api("/products?featured=true")
      .then((data)=>setProducts(data?.products || []))
      .catch(()=>setProducts([]))
      .finally(()=>setLoading(false));

  },[]);



  const categories=[
    {
      name:"Fruits",
      image:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500"
    },
    {
      name:"Vegetables",
      image:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=500"
    },
    {
      name:"Dairy",
      image:"https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500"
    },
    {
      name:"Bakery",
      image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500"
    }
  ];



  const reviews=[
    {
      name:"Rahul Sharma",
      text:"Fresh products and super fast delivery."
    },
    {
      name:"Priya Das",
      text:"Very smooth shopping experience."
    },
    {
      name:"Amit Roy",
      text:"Quality groceries at best price."
    }
  ];



return (

<div>


{/* HERO */}

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

  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(true);


  useEffect(()=>{

    api("/products?featured=true")
    .then((data)=>setProducts(data?.products || []))
    .catch(()=>setProducts([]))
    .finally(()=>setLoading(false));

  },[]);



  const fadeUp = {
    hidden:{
      opacity:0,
      y:60
    },

    show:{
      opacity:1,
      y:0,
      transition:{
        duration:.8,
        ease:"easeOut"
      }
    }
  };


  const stagger = {
    hidden:{
      opacity:0
    },

    show:{
      opacity:1,
      transition:{
        staggerChildren:.15
      }
    }
  };



return (

<div className="overflow-hidden">


{/* HERO SECTION */}

<section className="relative min-h-screen flex items-center py-20">


<motion.div

animate={{
  y:[0,-30,0]
}}

transition={{
 duration:6,
 repeat:Infinity
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
 y:[0,40,0]
}}

transition={{
 duration:7,
 repeat:Infinity
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



<div className="container-app relative grid lg:grid-cols-2 gap-14 items-center">


<motion.div

variants={fadeUp}

initial="hidden"

animate="show"

>


<motion.div

whileHover={{
scale:1.05
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

<motion.span

className="text-green-600"

animate={{
 color:[
 "#16a34a",
 "#22c55e",
 "#15803d"
 ]
}}

transition={{
duration:3,
repeat:Infinity
}}

>

Delivered fast.

</motion.span>


</h1>



<p className="
mt-6
text-lg
text-stone-600
max-w-xl
">

Shop fresh fruits, vegetables and daily essentials with fast doorstep delivery.

</p>



<div className="
mt-8
flex
gap-4
flex-wrap
">


<motion.div

whileHover={{
scale:1.08
}}

whileTap={{
scale:.95
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
["30+","Minute Delivery"],
["500+","Products"],
["4.9","Rating"]

].map((item)=>(

<motion.div

whileHover={{
y:-10
}}

key={item[0]}

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
scale:.8
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

src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"

className="
rounded-[3rem]
shadow-2xl
h-[550px]
w-full
object-cover
"

alt="grocery"

/>

</motion.div>



</motion.div>



</div>


</section>





{/* CATEGORY */}

<section className="container-app py-16">


<h2 className="text-4xl font-black text-center">

Shop By Category

</h2>


<div className="grid md:grid-cols-4 gap-6 mt-10">


{
categories.map((cat)=>(

<div
key={cat.name}
className="group overflow-hidden rounded-3xl bg-white shadow hover:-translate-y-2 transition"
>


<img
src={cat.image}
className="h-48 w-full object-cover group-hover:scale-110 transition"
/>


<h3 className="p-5 text-xl font-black">

{cat.name}

</h3>


</div>


))
}


</div>


</section>





{/* FEATURES */}

<section className="bg-green-50 py-16">


<div className="container-app grid md:grid-cols-4 gap-6">


{
[
[Truck,"Fast Delivery"],
[ShieldCheck,"Quality Checked"],
[Leaf,"Fresh Products"],
[Clock3,"Open Everyday"]

].map(([Icon,title])=>(


<div className="bg-white rounded-3xl p-6 text-center">

<Icon
className="mx-auto text-green-600"
size={35}
/>

<h3 className="mt-4 font-black">

{title}

</h3>

</div>


))
}


</div>


</section>





{/* PRODUCTS */}


<section className="container-app py-16">


<div className="flex justify-between items-center">

<h2 className="text-4xl font-black">

Today's Fresh Picks

</h2>


<Link
to="/products"
className="text-green-700 font-bold"
>

View All →

</Link>


</div>



{
loading ?

<LoadingGrid/>

:

<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

{
(products||[])
.slice(0,8)
.map((p,i)=>(

<ProductCard
key={p.id || i}
product={p}
index={i}
/>

))
}

</div>

}


</section>





{/* REVIEWS */}


<section className="bg-stone-100 py-16">


<div className="container-app">


<h2 className="text-4xl font-black text-center">

Customer Reviews

</h2>



<div className="grid md:grid-cols-3 gap-6 mt-10">


{
reviews.map((r)=>(


<div className="bg-white rounded-3xl p-7">


<div className="flex text-yellow-500">

{
[1,2,3,4,5].map(i=>
<Star key={i} fill="currentColor" size={18}/>
)
}

</div>


<p className="mt-5 text-stone-600">

"{r.text}"

</p>


<h3 className="mt-5 font-black">

{r.name}

</h3>


</div>


))
}



</div>


</div>


</section>





{/* CTA */}


<section className="container-app py-16">


<div className="rounded-[3rem] bg-green-600 text-white p-10 lg:p-16 text-center">


<ShoppingBasket
className="mx-auto"
size={45}
/>


<h2 className="mt-5 text-4xl font-black">

Fresh groceries are waiting for you

</h2>


<p className="mt-4 text-green-100">

Order today and enjoy doorstep delivery.

</p>


<Link
to="/products"
className="inline-block mt-8 bg-white text-green-700 px-8 py-3 rounded-full font-black"
>

Start Shopping

</Link>


</div>


</section>



</div>

);

}
