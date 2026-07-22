import Image from "next/image";
import Link from "next/link";

export const CardNews = ({
    post
}) => {    

    return (
        <div className="CardNews">
            {post.image && 
                <Image src={post.image.url} width={500} height={300} alt={post.image.alt} />
            }
            <h3>
                {post.post_title}
            </h3>
            <p>
                {post.post_excerpt}
            </p>
        </div>
    );
};
