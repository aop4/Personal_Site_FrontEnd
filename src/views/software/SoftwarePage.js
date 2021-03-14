import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { BASE_URL } from '../../constants';
import './software-page.css';

export default class SoftwarePage extends Component {
    render() {
        return (
            <div className="software-container text-container">
                <h1 className="software-phil-title">(Practical) software engineering philosophy</h1>
                
                <h2>Unit tests are foundational to reliable software.</h2>
                <p>During interviews, I've often asked people why unit tests are important. The usual answer is this: unit tests run quickly, and manual tests have to be slowly and painstakingly repeated. That's correct. But the candidates don't go any further. Unit tests vet code in a way no manual test possibly could. They examine each function, each individual component of the system. If your code were a bicycle, this would be like separately testing every piece that goes into the bicycle. The spokes, the chain, the handbrakes, the cables, the shocks. When we test all these individual components, we have that much more confidence in the bicycle itself. And what if we never tested them? What if the handbrake designer never tried squeezing the brake and the chain was never spun on a chainring? The parts might come off the assembly line with imperceptible defects, and I certainly wouldn't want to touch your bike. Unit tests ensure the stability of the system by testing it deeply. And of course, when someone breaks some code down the road, automated tests serve as a quality gate.</p>
                
                <h2>Functions should have a single identifiable purpose. More complex functions can call several others that each have a single purpose.</h2>
                <p>No one wants to deal with a 400-line function. No one even wants to scroll through it. One way to ensure your functions are concise is to ensure that they do just one thing. retrieveInventoryItems() should retrieve some items from an inventory, for example. But it shouldn't also send an email, update those items in a database, and store the speed of light in a global variable.</p>
                <p>When it's necessary to carry out multiple tasks, they can each be addressed with small functions that are called sequentially in a larger function. This way, most functions are focused and small, and a select few are more complex but still concise. Your code will read like a book, and you won't have to impose an arbitrary line limit to achieve it.</p>

                <h2>Languages and frameworks are frequently interchangeable.</h2>
                <p>Blasphemy, I know. You want speed, strict typing, and elegant object-oriented language features when you're building something at scale. I like to point out that Instagram was built with Python, which meets none of those criteria. And Instagram is pretty big. Most modern programming languages support the same basic constructs and have similar syntax. In special cases, it might be easier to do things in a certain language (R is good for data science and statistics, or so I hear). But most languages and competing frameworks are more similar than different.</p>
                
                <p>I don't mean to say every tool will meet your needs equally; I mean to say you should consider them more or less interchangeable with their peers, though. Think &#123; React, Angular, Vue, JQuery &#125;; &#123; Node, Django, Spring, Ruby on Rails &#125;; &#123; C#, Java, TypeScript, C++ &#125;. The members within each set are capable of doing pretty much the same things–they just use different approaches. Specific languages and frameworks should be a relatively small part of project and hiring decisions.</p>
                
                <h2>If a requirement doesn't make sense, then work to change it.</h2>
                <p>But wait, I'm not a product owner, right? It doesn't matter. As a developer, you have a technical understanding of the system. You can bring that to bear. If you realize that a requirement is contradictory or illogical, you can speak up. The alternative is to write code that won't serve users well. Code that you or someone else will have to go back and re-write later. Code that wastes a lot of people's time and hinders the success of the software. Maybe you're wrong and the requirements are just fine. You might as well make sure.</p>

                <h2>Half of your job is staying calm.</h2>
                <p>Beginner programmers get frustrated easily. This is natural: it's difficult to deal with a machine that can only interpret instructions literally. Computers are completely unforgiving and give what seems like cryptic feedback. I believe that early on, emotional regulation is one of a programmer's most important skills. When your mental bandwidth is consumed by panic or anger, you might not find the source of your mistakes. As we gain experience, we get better at dealing with ambiguous error messages and counterintuitive results. We learn to stay calm and seek the root of the problem. We become better at researching issues. But underlying our success is the ability to keep it together, to let curiosity rather than frustration guide us.</p>

                <h2>Be willing to learn from people with less technical experience.</h2>
                <p>A new developer might have a good idea. A quality assurance analyst might have a good idea. A product owner might have a good idea. Listen to them. Certainly don't make your mind up before they have the opportunity to defend their thoughts. There is value in a fresh perspective.</p>

                <h2>Aim for readability and modularity.</h2>
                <p>Readability is too often overlooked. If your code is difficult to interpret, it might result in hours of lost time down the road. You might not imagine someone taking two hours to trace text in the front end to a database column in the back end, but it might happen if your code is poorly written. Readability is something that's easily addressed as you write your code and trace over it. Is it as clear as it could be? Does what you've written truly "click?"</p>
                <p>Modularity is a sibling of readability. Did you break the work into functions that are grouped logically into classes? Are functions and classes named for exactly what they do? Are they focused on one task or area? If not, your code might be harder to read and maintain. Modularity can also provide the benefit of reuse. If you write modular functions, services, and UI components that can be re-used in different contexts, then you save time and avoid duplication of code.</p>
                <p>At the heart of modularity is also function length. The more work a function handles, the more difficult it is to understand, adjust, and unit test.</p>

                <h2>What you're building is just as important as how you build it.</h2>
                <p>If it's not a pet project, your software plays a real role in a very real world. We've seen what happens when the people building software refuse to address its impact. Planes crash. A patient gets the wrong medication. People's privacy is violated. Whatever their role, the people behind a piece of software need to remember its place in the world and act with that in mind.</p>

                <h2>Most software is a work in progress, just like this page.</h2>
                <p>If software is good, someone somewhere is going to ask you to make it better. Sometimes it happens in the middle of the development process, and sometimes it happens shortly before a release. In a truly agile process, we give the customer time and space to provide feedback, and we iterate on our design and implementation to satisfy their needs.</p>

                <hr className="software-page-break" />

                <h2>About me</h2>
                <p>I came into tech with an unusual perspective: I had been training to become a neuroscientist. My first experience was with a biological model that ran on supercomputers, and I started without any formal training in computer science.</p>
                <p>One summer, alongside the programming I did at the lab, I taught myself Java. I wanted to expand my horizons and test my ability to learn independently. That summer, seeing what I could accomplish, I became hooked on programming. It felt like breathing life into a machine. So I followed my heart. I changed my college major, and two and a half years later, I graduated with a B.S. in computer science.</p>
                <p>I have focused primarily on web development and to a lesser extent on mobile development. Whether I'm contributing to the front end or back end (I enjoy full stack development most), I find it extremely exciting to make something people will interact with.</p>
                <p>I am also interested in human-computer interaction and the broader effects of technology on society. Ultimately, I want to use technology to make the world a better place. By no means do I view tech as a panacea that will solve all of our problems. But I think it can effect positive change when designed and used with pure intentions.</p>
                <p>I do not have a portfolio of my own work at the moment, but some of it can be found on GitHub:</p>
                <div className="center">
                    <a href="https://github.com/aop4"
                        title="Follow the Octocat (GitHub)">
                        <FontAwesomeIcon icon={ faGithubSquare }
                            className="github-icon" />
                    </a>
                </div>
            </div>
        );
    }

    /**
     * After the page loads, this sends a request to the base URL. (To conserve
     * resources, the back end sleeps when there's no traffic. This wakes it up
     * so that other pages will load quickly, because this may be a common
     * entrypoint to the site.)
     */
    componentDidMount() {
        axios.get(BASE_URL);
    }

}
