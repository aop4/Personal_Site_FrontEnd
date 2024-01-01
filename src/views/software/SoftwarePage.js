import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { BASE_URL } from '../../constants';
import { CodeBlock, github } from 'react-code-blocks';
import './software-page.css';

export default class SoftwarePage extends Component {
    render() {
        const javaCodeSample = 'public void processSale(OrderData orderData) {\n' +
                                '    this.validateOrder(orderData);\n' +
                                '    this.inventoryService.updateInventory(orderData);\n' +
                                '    this.warehouseService.initiateOrderShipping(orderData);\n' +
                                '    this.notificationService.sendOrderConfirmation(orderData);\n' +
                                '}'
        return (
            <div className="software-container text-container">
                <h1 className="software-phil-title">(Practical) software engineering philosophy</h1>

                <p>Software engineering is a creative pursuit that no two people will approach the same way. That said, these are some guiding principles that I've personally found helpful during my career.</p>

                <h2>What you're building is just as important as how you build it.</h2>
                <p>If it's not a pet project, your software plays a real role in the real world. When organizations prioritize delivery speed, profit, or convenience over the well-being of users, there are real consequences. Planes crash. A patient gets the wrong medication. Privacy is violated.</p>
                <p>Given our interest in technical design and implementation, it's easy for engineers to keep our heads down and do what we're told. But what if we're told to do something we see as questionable or unethical? What if we notice a flaw that could bring down production?</p>
                <p>As those closest to the codebase, we have the clearest insight into our systems, and we know things no one else knows. With your unique perspective and knowledge, you may be the only person who recognizes a problem. Engineers aren't solely responsible for organizational failures, but we have a duty to speak up when we see them coming.</p>

                <h2>Unit tests are foundational to reliable software.</h2>
                <p>During interviews, I've often asked candidates why unit tests are important. They usually say that a unit test suite can be executed much faster than a manual test suite. That's true, but it just scratches the surface. To fully benefit from unit testing, we need to understand everything it offers.</p>
                <p>Unit tests vet code in a way no manual test can. They examine the smallest testable components of the system. If your code were a bicycle, this would be like separately testing every part of the bicycle. The spokes, the chain, the handbrakes, the shocks. Once we've tested all these individual components, we can have much more confidence in the bicycle as a whole.</p>
                <p>And what if we never tested them? What if the handbrake designer never tried squeezing the brake and the chain was never spun on a chainring? The parts might come off the assembly line with imperceptible defects, and I certainly wouldn't want to touch that bike. Unit tests ensure the stability of the system by testing it deeply.</p>
                <p>Other benefits of unit testing are that it encourages you to dream up all the edge cases your code might encounter and to design your code in such a way that future programmers can easily use it. And of course, if someone refactors a function in the future, unit tests serve as a quality gate.</p>

                <h2>Don't encourage best practices—enforce them.</h2>
                <p>The only way to guarantee that best practices are followed is to make them mandatory.</p>
                <p>No matter how nicely you ask a group of programmers to deliver code with 80% test coverage, people will underdeliver if all you've done is ask. Humans make mistakes.</p>
                <p>What <em>will</em> guarantee 80% coverage is setting up an automated check in your build pipeline that keeps non-compliant code from being merged. Similarly, linters can enforce style guidelines, and version control platforms can mandate code review. Many of the tools we use can be configured to raise the standard of quality.</p>
                <p>Once these guide rails are in place, they humble just about everyone and catch mistakes from the best of the best.</p>
                <p>Quality gates have a significant impact on the developer experience, so it's wise to hold a vote before adopting new rules to make sure everyone's voice is heard.</p>
                
                <h2>Half of your job is staying calm.</h2>
                <p>Beginner programmers are often frustrated by the craft. This is natural: when we transition from using software to writing it, we're suddenly faced with unintuitive tools that can't tolerate ambiguity and give us cryptic feedback.</p>
                <p>From the beginning, emotional regulation is one of a programmer's most important skills. When your mental bandwidth is consumed by panic or anger, it's difficult to find the source of your mistakes.</p>
                <p>As we gain experience, we get better at dealing with ambiguous error messages and counterintuitive results. We learn to stay calm and seek the root of the problem. Underlying our success is the ability to keep it together, to let curiosity rather than frustration guide us.</p>

                <h2>Functions should have a single identifiable purpose.</h2>
                <p>We've all groaned at 500-line functions in legacy code, and with good reason: the more work a function handles, the harder it is to modify and test. Sometimes monster functions are the result of generations of programmers who felt rushed and added their code in the most convenient place to meet a deadline. Sometimes the legacy code was just poorly designed to begin with.</p>
                <p>One way to make sure your functions are concise—and that they <em>stay</em> concise—is to ensure they do just one thing. <code>retrieveInventoryItems()</code> should retrieve some items from an inventory, for example. But it shouldn't also send an email, update those items in a database, and store the speed of light in a global variable.</p>
                <p>To orchestrate a series of related tasks, one "root-level" function can call multiple lower level functions that each have a single clear purpose. Here's a simple example:</p>
                <CodeBlock language="java" 
                    showLineNumbers={false}
                    theme={github}
                    text={javaCodeSample}>
                </CodeBlock>
                <p>Because it calls on more specialized functions to do the heavy lifting, we can get a high-level understanding of the <code>processSale()</code> function with one quick glance. If <code>processSale()</code> did everything by itself, it might be a 2,000-line giant.</p>
                <p>Of course, classes, packages, and projects should have a clearly identifiable purpose as well. But because functions are our most fundamental building blocks, poorly structured functions tend to be especially troublesome. Once we let them grow into monsters, taming them becomes a formidable task.</p>

                <h2>Write code for people.</h2>
                <p>When you can think of multiple ways to accomplish a task, favor the implementation that will be easiest for programmers to understand and work with in the future.</p>
                <p>Programmers are all authors. We're writing code for two audiences at once: computer processors and other people. There are practically infinite ways to write code that functions correctly, but most of them aren't readable, performant, or reasonable. That's why programming is hard.</p>
                <p>Readability can be addressed as you write code and re-read it. How long would it take a newcomer to grasp what it does? Did you choose good variable names? Is there anything that should be clarified with a comment? Does what you've written truly "click"?</p>
                <p>Even when the code seems crystal clear in an IDE, it's helpful to review your own pull requests before you add reviewers. You may save yourself some embarassment by catching silly mistakes, but more importantly it puts you in the shoes of your human audience. You're writing code for <em>people</em>—including all the present and future colleagues who will have to understand and work with it.</p>

                <h2>Reduce, reuse, refactor.</h2>
                <p>Look for opportunities to reuse code so that you and your colleagues don't keep reinventing the wheel.</p>
                <p>Perhaps you're working with a monolith, and you notice that the same 30-line permission check is duplicated six times. Maybe instead of copying it yet again, you could abstract it into a class dealing with permissions.</p>
                <p>In a distributed environment where there's crosstalk between microservices, it may be helpful to write a client library for a given service, rather than writing separate clients in each dependent application.</p>
                <p>And of course, when creating a UI, you can build modular components with an eye toward reusing them in different contexts.</p>
                <p>This idea is nothing new: as the mantra goes, "don't repeat yourself." The hard part is taking a step back and realizing that several teams, projects, or modules are all doing the same thing. But staying one step ahead of duplication saves time, streamlines maintenance, and reduces complexity.</p>

                <h2>If a requirement doesn't make sense, then work to change it.</h2>
                <p>If you think a requirement is ill-advised or illogical, bring it up with your team.</p>
                <p>The alternative is to write code that won't serve users well. Code that hinders the success of the software. Code that you or someone else will have to rewrite later.</p>
                <p>Maybe you're wrong and the requirements are just fine. You might as well make sure.</p>

                <h2>Languages and frameworks are frequently interchangeable.</h2>
                <p>Blasphemy, I know. We need speed, type safety, and elegant object-oriented language features to build systems that scale! But consider this: Instagram was built with Python, which meets none of those criteria. And Instagram is pretty big.</p>
                <p>Most modern programming languages support the same basic constructs and have similar syntax. In special cases, it might be easier to do things in a certain language (R is good for data science and statistics, or so I hear). But most languages and competing frameworks are more similar than different.</p>
                <p>Consider the following three sets of tools:</p>
                <ul>
                    <li><p>&#123; React, Angular, Vue, JQuery &#125;</p></li>
                    <li><p>&#123; Spring Boot, Ruby on Rails, Django, Node &#125;</p></li>
                    <li><p>&#123; C#, Java, JavaScript, Python &#125;</p></li>
                </ul>
                <p>The members within each set are capable of doing pretty much the same things. You can still build a fully functioning website with JQuery today. You could rewrite a Spring Boot service with Rails, completely preserving its behavior along the way. That's because they are just tools designed to solve the same basic problems.</p>
                <p>I am not advocating for clinging to outdated technologies forever, nor am I denying that new tools can be revolutionary for developers' productivity.</p>
                <p>Actually, I bring this up because of a trend among recruiters and hiring managers to look for experience with specific tools. There is a tendency to label people as "Java" or "iOS" developers and keep them on a narrow path.</p>
                <p>Every developer is capable of learning a new language or framework by building off of past experience with similar tools. If they have a firm understanding of their domain (say, RESTful microservices), then learning new tools is largely a matter of learning new syntax. A strong foundation is what makes a candidate capable.</p>

                <h2>Software is always a work in progress.</h2>
                <p>If software is good, someone somewhere will ask you to make it better. Sometimes it happens in the middle of the development process, and sometimes it happens after a release. In a truly agile process, we give the customer time and space to provide feedback, we listen, and we iterate on our design and implementation to satisfy their needs.</p>

                <hr className="software-page-break" />

                <h1>My Interests</h1>
                <p>I transitioned into tech with an unusual perspective: I had been training to become a neuroscientist. My first professional experience was with a biological model that ran on supercomputers, and self-teaching has been a constant theme throughout the journey.</p>
                <p>One summer, alongside the programming I did at the lab, I taught myself Java. I wanted to expand my horizons and test my ability to learn independently. That summer, seeing what I could accomplish, I became hooked on programming. It felt like breathing life into a machine. So I followed my heart. I changed my college major, and two and a half years later, I graduated with a degree in computer science.</p>
                <p>I have focused primarily on web development and to a lesser extent on mobile development. Whether I'm contributing to the front end or back end (I enjoy full stack development most), I find it extremely exciting to make something people will interact with.</p>
                <p>I am also interested in human-computer interaction and the broader effects of technology on society. Ultimately, I want to use technology to make the world a better place. By no means do I view tech as a panacea that will solve all of our problems. But I think it can effect positive change when designed and used ethically.</p>
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
