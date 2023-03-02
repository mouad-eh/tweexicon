import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import React from 'react';
import Masonry from 'react-masonry-css';

function createMarkup(html) {
    return { __html: html };
}

export default function PostsGrid() {
    const breakpointColumnsObj = {
        default: 3,
        1200: 3,
        1100: 2,
        600: 1
    };
    var posts = [
        "<blockquote class=\"twitter-tweet\" data-width=\"350\"><p lang=\"en\" dir=\"ltr\">From Meta engineer to Slack chief architect to now VC at <a href=\"https://twitter.com/pebble_bed?ref_src=twsrc%5Etfw\">@pebble_bed</a>, <a href=\"https://twitter.com/keithmadams?ref_src=twsrc%5Etfw\">@keithmadams</a> is back on <a href=\"https://twitter.com/software_daily?ref_src=twsrc%5Etfw\">@software_daily</a>!<br><br>We discuss technology, startups, investing, and like all conversations that exist today, ChatGPT.<br><br>Check it out 👇<a href=\"https://t.co/1FBKeJ557D\">https://t.co/1FBKeJ557D</a></p>&mdash; Sean Falconer (@seanfalconer) <a href=\"https://twitter.com/seanfalconer/status/1626177187580678147?ref_src=twsrc%5Etfw\">February 16, 2023</a></blockquote>",
        "<blockquote class=\"twitter-tweet\" data-width=\"350\"><p lang=\"ar\" dir=\"rtl\">تعرفون متى&quot;يتعافى المرء&quot;؟ إذا تقرب من الله قرب اليقين؛اليقين الذي لا يشوبّه شك ولا اعتراض. إذا آمن حق الإيمان والتوكل بأن التوفيق والنيل من الله،التسخير والمحبّة من الله،القبول في القلوب من الله،اتساع الطرق وسرعة الوصول من الله،سعة الصدر والقوة والروح الحلوة السمحة من الله..فقط</p>&mdash; سيّاف العتيبي (@sayaf_22) <a href=\"https://twitter.com/sayaf_22/status/1622342610684710922?ref_src=twsrc%5Etfw\">February 5, 2023</a></blockquote>\n",
        "<blockquote class=\"twitter-tweet\" data-width=\"350\"><p lang=\"ar\" dir=\"rtl\">أنا معاك إن معظم الحالات مش بتفرق بس في بعض الحالات بتفرق جدا و بتفرق ماديًا كمان من ناحية إستهلاك الريسورسيز و غيره<br>دا مقال جميل عن ليه discord راحت ل rust بعد ماكانوا بيستخدموا go <br>المقال ممتع <a href=\"https://t.co/fK9hwGYcIS\">https://t.co/fK9hwGYcIS</a></p>&mdash; Ahmed Elemam (@ahmdelemam) <a href=\"https://twitter.com/ahmdelemam/status/1610422344681508864?ref_src=twsrc%5Etfw\">January 3, 2023</a></blockquote>\n",
        "<blockquote class=\"twitter-tweet\" data-width=\"350\"><p lang=\"ar\" dir=\"rtl\">للأمانة هذا الكورس مرجع عظيم لأي حد حابب يتعلم الـ ML شرح ممتاز ومدرس عظيم و مغطي جوانب كثيرة جدا وأساسية مفيش حشو على الفاضي <a href=\"https://t.co/5LOi4ure2d\">https://t.co/5LOi4ure2d</a></p>&mdash; Ali (@AliGreo) <a href=\"https://twitter.com/AliGreo/status/1607756704963256321?ref_src=twsrc%5Etfw\">December 27, 2022</a></blockquote>\n",
        "<blockquote class=\"twitter-tweet\" data-width=\"350\"><p lang=\"en\" dir=\"ltr\">Beauty is in the 👁️ of the browser<br><br>Presenting... Peek! <a href=\"https://t.co/ONdQ3Ip4Ko\">pic.twitter.com/ONdQ3Ip4Ko</a></p>&mdash; The Browser Company (@browsercompany) <a href=\"https://twitter.com/browsercompany/status/1626242699648192514?ref_src=twsrc%5Etfw\">February 16, 2023</a></blockquote>\n"
    ];
    return (
        <Sheet sx={{
            my: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {posts.map((htmlstr, ind) => (
                    <Box key={ind} dangerouslySetInnerHTML={createMarkup(htmlstr)}></Box>
                ))}
            </Masonry>
        </Sheet>
    )
}